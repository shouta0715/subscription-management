# サブスクリプション管理アプリ - 仕様書

このドキュメントは、設計思想と実装の対応関係を整理し、今後の実装時の参考資料として機能します。

## プロジェクト概要

### アプリの目的
サブスクリプション契約そのものを管理するためのアプリケーション

### 明確な「非」機能
- **家計簿ではない** - 収支全体や資産管理は扱わない
- **銀行連携なし** - 管理対象はサブスク契約そのもの

### 中心となる設計思想

#### 1. カード主体の設計
「カードごとに、どのサブスクがいくら引き落とされているか」を見る思想。カード別の表示と集計が中心。

#### 2. Apple / Google サブスクの正しい扱い
Apple Pay や Google Play 経由のサブスクは、カードに直接紐付かない独立した支払い口として扱う。

#### 3. 二重計上の防止
表示や集計の都合で事実関係を単純化しない。subscription（契約）単位で1回のみ計上。

#### 4. 厳密な日付管理
課金開始日、キャンセル日、課金終了日を役割ごとに分離して管理し、整合性をアプリ側で保証。

---

## データモデル設計

### 中心概念

#### subscription（サブスク契約）
サブスク契約を表す最小単位。

**状態:**
- `active` - 現在有効な契約
- `canceled` - キャンセル済みの契約

**日付フィールド:**
- `billingStartDate` - 課金開始日（必須）
- `canceledDate` - キャンセル操作日（canceled時のみ）
- `billingEndDate` - 実際の課金終了日（canceled時のみ）

**整合ルール:**
```
billingStartDate ≤ canceledDate ≤ billingEndDate
```

#### payment_method（支払い口）
サブスクの「支払い口」を表す抽象概念。ユーザーが直接管理する対象ではない。

**種類:**
- `card` - クレジットカード決済（`cardId`必須）
- `apple` - Apple Pay（`cardId`不要）
- `google` - Google Play（`cardId`不要）
- `other` - その他の支払い方法（`cardId`不要）

#### card（クレジットカード）
ユーザーが管理する実際のクレジットカード。

**主要フィールド:**
- カード名、ブランド（Visa, Mastercard, JCB, Amex, Diners, Other）
- 請求締日（1-31）、支払日（1-31）

#### subscription_tag（タグ）
ユーザーが定義するタグ。

**制約:**
- 同一ユーザー内でタグ名は一意
- 8色のカラートークンで視覚的に区別
- 中間テーブル（`subscription_tag_assignment`）で多対多の関連付け

---

## 設計思想と実装の対応

| 設計思想 | 実装状況 | 実装方法 |
|---------|---------|---------|
| **カード主体の設計** | ✅ 実装済み | `payment_method.cardId`でカードと関連付け。type='card'の場合のみcardId必須（DB CHECK制約 + Valibot variant） |
| **Apple/Googleサブスクの扱い** | ✅ 実装済み | `payment_method.type='apple'/'google'`の場合、cardIdは不要。独立した支払い口として扱う |
| **二重計上の防止** | ✅ 設計済み | subscription単位で金額管理。payment_methodを経由してcardに辿る設計 |
| **厳密な日付管理** | ✅ 実装済み | 3つの日付フィールドを分離。Valibotで整合性チェック（`billingStartDate ≤ canceledDate ≤ billingEndDate`） |
| **日付形式** | ✅ 実装済み | YYYY-MM-DD形式。`2025-2-3`と`2025-02-03`の両方を許容。実在する日付のみ許可（Valibotカスタムバリデーション） |
| **user境界の担保** | ✅ 実装済み | DB: 全テーブルに`userId`とCASCADE削除。API: 全エンドポイントで`WHERE userId = ?`フィルタ |
| **タグ機能** | ✅ 実装済み | 中間テーブルで多対多。UNIQUE制約でユーザーごとにタグ名を一意に |

---

## バリデーション戦略

### 多層防御アプローチ

#### 1. DB層（SQLite + Drizzle ORM）
- **外部キー制約** - リレーションの整合性保証
- **CHECK制約** - 値の範囲チェック（例: `amountMinor >= 0`, `closingDay BETWEEN 1 AND 31`）
- **UNIQUE制約** - 重複防止（例: 同一userでタグ名一意）
- **NOT NULL制約** - 必須フィールドの保証
- **カスタムCHECK** - `type='card'`の場合、`cardId IS NOT NULL`

#### 2. アプリ層（Valibot）
- **ランタイム型検証** - DB取得データの検証
- **日付形式チェック** - YYYY-MM-DD形式の正規表現 + 実在日付検証
- **variant型** - status/typeによる条件付きスキーマ分岐
- **カスタムチェック** - 日付の大小関係検証（`v.check()`）
- **型ブランディング** - UUID型の安全性確保（`SubscriptionId`, `CardId`など）

### 整合性チェックの実装

```typescript
// packages/model/src/subscriptions/check.ts
const isValidSubscriptionData = (data: SubscriptionData): boolean => {
  const startTimestamp = new Date(`${billingStartDate}T00:00:00Z`).getTime();
  const canceledTimestamp = new Date(`${canceledDate}T00:00:00Z`).getTime();
  const endTimestamp = new Date(`${billingEndDate}T00:00:00Z`).getTime();

  return (
    startTimestamp <= canceledTimestamp && canceledTimestamp <= endTimestamp
  );
};
```

このチェックは`canceledSubscriptionSchema`で自動的に実行されます。

---

## 現在の実装状況

### ✅ 完成している部分

1. **DBスキーマ** - 全テーブル定義、リレーション、制約完成
2. **モデル定義** - Valibotスキーマ、型推論、ガード関数完成
3. **認証基盤** - Better Authによる認証・セッション管理完成
4. **API GETエンドポイント** - 全リソースの一覧取得完成

### ⚠️ 未実装の部分

1. **API書き込み操作** - POST/PUT/DELETE エンドポイント
2. **リレーションデータの取得** - JOINを使った効率的な取得
3. **エラーハンドリング** - 統一的なエラーレスポンス
4. **フロントエンド** - React Nativeアプリの実装（基盤のみ）

---

## 今後の実装ガイドライン

### API書き込み操作の実装時の注意点

#### 1. user境界の徹底

**作成操作（POST）**
```typescript
// 認証済みuserIdを自動設定
const userId = c.var.user.id;
await db.insert(subscription).values({
  ...data,
  userId,  // 必ず認証済みユーザーIDを使用
});
```

**更新・削除操作（PUT/DELETE）**
```typescript
// WHERE句でuserIdを必ずチェック
await db
  .update(subscription)
  .set(data)
  .where(
    and(
      eq(subscription.id, id),
      eq(subscription.userId, c.var.user.id)  // 重要
    )
  );
```

**リレーション先の所有権確認**
```typescript
// payment_method作成時、cardIdの所有者確認
if (data.type === 'card' && data.cardId) {
  const card = await db
    .select()
    .from(card)
    .where(
      and(
        eq(card.id, data.cardId),
        eq(card.userId, c.var.user.id)  // 所有権確認
      )
    );

  if (!card) {
    throw new Error("Card not found or not owned by user");
  }
}
```

#### 2. payment_method と card の整合性

**type別の処理分岐**
```typescript
// type='card'の場合のみcardId必須
if (data.type === 'card') {
  if (!data.cardId) {
    throw new Error("cardId is required for card payment method");
  }
  // cardの所有権確認（上記参照）
}

// Apple/Google/Otherの場合、cardIdは無視
if (data.type !== 'card' && data.cardId) {
  throw new Error("cardId should not be provided for non-card payment methods");
}
```

#### 3. subscription の状態管理

**状態遷移ルール**
```typescript
// active → canceled への遷移
if (currentStatus === 'active' && newStatus === 'canceled') {
  // canceledDate と billingEndDate を設定
  if (!data.canceledDate || !data.billingEndDate) {
    throw new Error("canceledDate and billingEndDate are required");
  }
  // Valibotが自動的に日付の整合性をチェック
  const validated = parseSchema(canceledSubscriptionSchema, data);
}

// canceled → active への逆戻りは禁止
if (currentStatus === 'canceled' && newStatus === 'active') {
  throw new Error("Cannot reactivate canceled subscription");
}
```

#### 4. タグ管理

**タグ作成時の一意性チェック**
```typescript
// DB制約で自動的にエラーになるが、事前チェック推奨
const existing = await db
  .select()
  .from(subscriptionTag)
  .where(
    and(
      eq(subscriptionTag.userId, c.var.user.id),
      eq(subscriptionTag.label, data.label)
    )
  );

if (existing.length > 0) {
  throw new Error("Tag with this label already exists");
}
```

**タグアサインメント作成時の所有権確認**
```typescript
// subscriptionとtagの両方の所有権を確認
const [subscription, tag] = await Promise.all([
  db.select().from(subscription).where(/* userId確認 */),
  db.select().from(subscriptionTag).where(/* userId確認 */),
]);

if (!subscription || !tag) {
  throw new Error("Subscription or tag not found");
}
```

---

### フロントエンド実装時の考慮事項

#### 1. カード別表示の実装

**表示ロジック**
```typescript
// payment_method.type='card' かつ cardIdが存在するもののみ
const cardSubscriptions = subscriptions.filter(sub =>
  sub.paymentMethod.type === 'card' && sub.paymentMethod.cardId
);

// カード別にグループ化
const groupedByCard = groupBy(cardSubscriptions, sub =>
  sub.paymentMethod.cardId
);

// Apple/Googleサブスクは別セクション
const appleSubscriptions = subscriptions.filter(sub =>
  sub.paymentMethod.type === 'apple'
);
const googleSubscriptions = subscriptions.filter(sub =>
  sub.paymentMethod.type === 'google'
);
```

**合計金額の計算（二重計上防止）**
```typescript
// subscription単位で1回のみ計上
const totalAmount = subscriptions.reduce((sum, sub) => {
  return sum + sub.amountMinor;  // payment_methodを経由しない
}, 0);
```

#### 2. 日付入力の扱い

**入力の許容**
```typescript
// 2025-2-3 と 2025-02-03 の両方を許容
// Valibotが自動的に検証
const schema = yyyymmddSchema;  // packages/model/src/common/date.ts

// フォーム送信前にクライアント側でも検証推奨
try {
  const validated = parseSchema(schema, inputDate);
} catch (error) {
  // エラーメッセージを表示
}
```

#### 3. 状態遷移のUI

**キャンセル操作の実装**
```typescript
// キャンセルフォーム
const handleCancel = async (data: {
  canceledDate: string;
  billingEndDate: string;
}) => {
  // Valibotが自動的に整合性チェック
  try {
    const validated = parseSchema(canceledSubscriptionSchema, {
      ...subscription,
      status: 'canceled',
      canceledDate: data.canceledDate,
      billingEndDate: data.billingEndDate,
    });

    // API呼び出し
    await updateSubscription(subscription.id, validated);
  } catch (error) {
    // 整合性エラーの場合、明確なメッセージを表示
    if (error.message.includes("billingStartDate")) {
      alert("課金開始日より前の日付は設定できません");
    }
  }
};
```

---

## 実装優先度の提案

### フェーズ1: API書き込み操作（高優先度）
1. subscription の作成・更新・削除
2. card の作成・更新・削除
3. payment_method の作成・削除（更新は不要）
4. subscription_tag の作成・削除
5. subscription_tag_assignment の作成・削除

### フェーズ2: データ取得の最適化（中優先度）
1. subscription取得時に payment_method と card を JOIN
2. N+1問題の解決（Drizzle Relations活用）
3. カード別集計APIの実装

### フェーズ3: エラーハンドリングの強化（中優先度）
1. 統一的なエラーレスポンス形式
2. バリデーションエラーの詳細メッセージ
3. 所有権エラーの適切なHTTPステータス（403 Forbidden）

### フェーズ4: フロントエンド実装（低優先度）
1. カード一覧・詳細画面
2. サブスク一覧・詳細・編集画面
3. タグ管理画面
4. カード別集計表示

---

## 重要な実装ファイル

### DBスキーマ
- `apps/api/src/db/schemas/subscriptions.ts`
- `apps/api/src/db/schemas/payment-methods.ts`
- `apps/api/src/db/schemas/cards.ts`
- `apps/api/src/db/schemas/subscription-tags.ts`
- `apps/api/src/db/schemas/users.ts`

### モデル定義（Valibot）
- `packages/model/src/subscriptions/schema.ts`
- `packages/model/src/cards/schema.ts`
- `packages/model/src/payment-methods/schema.ts`
- `packages/model/src/subscription-tags/schema.ts`
- `packages/model/src/common/date.ts` - 日付検証

### APIルーター
- `apps/api/src/routers/subscriptions/route.ts`
- `apps/api/src/routers/cards/route.ts`
- `apps/api/src/routers/payment-methods/route.ts`
- `apps/api/src/routers/subscription-tags/route.ts`

### ヘルパー・ミドルウェア
- `apps/api/src/helpers/factory.ts` - Hono factory
- `apps/api/src/middleware/auth/session.ts` - 認証ミドルウェア
- `packages/lib/src/parser.ts` - Valibot parseSchema

---

## まとめ

このプロジェクトは、設計思想が明確で、実装も設計に忠実に従っています。

**強み:**
- カード主体の設計が一貫している
- 二重計上を防ぐ設計が徹底されている
- 多層防御によるデータ整合性の保証
- user境界の徹底的な担保

**次のステップ:**
- API書き込み操作の実装
- リレーションデータの効率的な取得
- フロントエンドの本格実装

この仕様書を参考に、設計思想を維持しながら実装を進めてください。

import Image from "next/image";
import { MapPin, Clock, Phone, DollarSign, Tag } from "lucide-react";
import { Shop } from "@/types";

// app/shop/detail/page.tsx (サーバーコンポーネントの例)
export default async function DetailPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id } = searchParams;
  if (!id) return <div>ID が指定されていません。</div>;
  

  // ここで、先ほど作成した route.ts を呼び出すエンドポイントへリクエストします
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${id}`);
  //console.log("😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫",res,"😫😫😫😫😫😫😫😫😫😫😫😫");

  if (!res.ok) {
    return <div>データ取得エラーです</div>;
  }
  const jsondata = await res.json();
  const restaurantData = jsondata[0];

  console.log("😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫",restaurantData,"😫😫😫😫😫😫😫😫😫😫😫😫");


//=====client compornent app/shop/detail/page.tsx
// "use client";

// // 独自のエラークラス
// class APIError extends Error {
//   constructor(public status: number, message: string) {
//     super(message);
//     this.name = "APIError";
//   }
// }

// // HotPepper API から店舗データを取得するためのヘルパー関数
// async function fetchHotpepperData(url: string): Promise<Shop[]> {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new APIError(response.status, `API request failed: ${response.statusText}`);
//   }
//   const data = await response.json();
//   if (!data.results?.shop) {
//     throw new APIError(404, "No shops found");
//   }
//   return data.results.shop;
// }

// interface HomeProps {
//   restaurantData: Shop | null;
// }

// // サーバーコンポーネントとして直接データフェッチを行う
// export default async function DetailPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ id?: string }>;
// }) {
//   const { id } = await searchParams;
//   if (!id) return <div>ID が指定されていません。</div>;

//   const apiKey = process.env.HOTPEPPER_API_KEY;
//   if (!apiKey) throw new Error("API key is not set");

//   // 必要なパラメータを組み合わせて URL を作成
//   const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
//   const large_area = "Z011"; // 例として large_area を指定
//   const format = "json";
//   const url = `${baseUrl}?key=${apiKey}&format=${format}&large_area=${large_area}&id=${id}`;


  // // API からデータ取得
  // const shops: Shop[] = await fetchHotpepperData(url);
  // console.log("😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫",shops);
  // // 例として先頭の店舗情報を取得
  // const restaurantData = shops[0];


  // ===client compoernent のretern
  // return (
  //   <div className="container mx-auto px-4 py-8 max-w-4xl">
  //     <Head>
  //       <title>{restaurantData.name || "レストラン詳細"}</title>
  //     </Head>
  //     <div className="space-y-8">
  //       {/* レストラン名と画像 */}
  //       <div className="relative rounded-lg overflow-hidden">
  //         <div className="aspect-video w-full relative h-[100px] md:h-[400px]">
  //           <Image
  //             src={
  //               restaurantData.photo &&
  //               restaurantData.photo.pc &&
  //               restaurantData.photo.pc.l
  //                 ? restaurantData.photo.pc.l
  //                 : "/placeholder.svg?height=600&width=1200"
  //             }
  //             alt={restaurantData.name || "レストラン画像"}
  //             fill
  //             className="object-cover"
  //             priority
  //           />
  //         </div>
  //         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
  //           <h1 className="text-3xl md:text-4xl font-bold text-white">
  //             {restaurantData.name || "レストラン名"}
  //           </h1>
  //         </div>
  //       </div>

  //       {/* レストラン詳細 */}
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //         <div className="md:col-span-2 space-y-6">
  //           {/* 住所 */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-6">
  //               <div className="flex items-start gap-3">
  //                 <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
  //                 <div>
  //                   <h2 className="font-semibold text-lg mb-1">住所</h2>
  //                   <p className="text-muted-foreground">
  //                     {restaurantData.address || "住所情報がありません"}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //           {/* 営業日・営業時間 */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-6">
  //               <div className="flex items-start gap-3">
  //                 <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
  //                 <div>
  //                   <h2 className="font-semibold text-lg mb-1">営業時間</h2>
  //                   <div className="space-y-1">
  //                     <p>
  //                       <span className="font-medium">営業日：</span>
  //                       {restaurantData.open || "情報なし"}
  //                     </p>
  //                     <p>
  //                       <span className="font-medium">定休日：</span>
  //                       {restaurantData.close || "情報なし"}
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div> 
  //           </div>

  //           {/* 連絡先 */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-6">
  //               <div className="flex items-start gap-3">
  //                 <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
  //                 <div>
  //                   <h2 className="font-semibold text-lg mb-1">連絡先</h2>
  //                   <p className="text-muted-foreground">
  //                     {restaurantData.tel || "連絡先情報なし"}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //         <div className="space-y-6">
  //           {/* 予算 */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-6">
  //               <div className="flex items-start gap-3">
  //                 <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
  //                 <div>
  //                   <h2 className="font-semibold text-lg mb-1">予算</h2>
  //                   <p className="text-muted-foreground">
  //                     {restaurantData.budget.average || "情報なし"}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* 店舗種類・特徴 */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-6">
  //               <div className="flex items-start gap-3">
  //                 <Tag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
  //                 <div>
  //                   <h2 className="font-semibold text-lg mb-3">
  //                     店舗種類・特徴
  //                   </h2>
  //                   <div className="flex flex-wrap gap-2">
  //                     {restaurantData.genre && restaurantData.genre.name ? (
  //                       <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
  //                         {restaurantData.genre.name}
  //                       </span>
  //                     ) : (
  //                       <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
  //                         特徴情報なし
  //                       </span>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Map Placeholder */}
  //           <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
  //             <div className="p-0">
  //               <div className="aspect-square relative h-[200px]">
  //                 <Image
  //                   src="/placeholder.svg?height=400&width=400&text=Map"
  //                   alt="地図"
  //                   fill
  //                   className="object-cover"
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  

  /**
   * ダミーの口コミデータ
   */
  const dummyReviews = [
    "とても美味しかったです！また来たい。",
    "コスパが良い。ランチがおすすめ。",
    "個室が快適でゆっくり過ごせました。",
  ];


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ヒーロー画像 + 店舗名 */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="aspect-video w-full relative h-[300px] md:h-[400px]">
          <Image
            src={restaurantData.photo.pc.l || "/placeholder.svg"}
            alt={restaurantData.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {restaurantData.name}
          </h1>
        </div>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* 左カラム */}
        <div className="md:col-span-2 space-y-6">
          {/* 住所 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-1">住所</h2>
                  <p className="text-muted-foreground">
                    {restaurantData.address || "住所情報がありません"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 営業日・営業時間 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-1">営業日・営業時間</h2>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">営業日：</span>
                      {restaurantData.open || "情報なし"}
                    </p>
                    <p>
                      <span className="font-medium">定休日：</span>
                      {restaurantData.close || "情報なし"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 連絡先 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-1">連絡先</h2>
                  <p className="text-muted-foreground">
                    {restaurantData.tel || "連絡先情報なし"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* その他メモ */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <h2 className="font-semibold text-lg mb-3">その他メモ</h2>
              <div className="space-y-2 text-muted-foreground whitespace-pre-line">
                {restaurantData.other_memo || "特記事項なし"}
              </div>
            </div>
          </div>
        </div>

        {/* 右カラム */}
        <div className="space-y-6">
          {/* 予算 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-1">予算</h2>
                  <p className="text-muted-foreground">
                    {restaurantData.budget.average || "情報なし"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 店舗種類・特徴 */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Tag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-lg mb-3">
                    店舗種類・特徴
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {restaurantData.genre?.name ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                        {restaurantData.genre.name}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                        特徴情報なし
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-0">
              <div className="aspect-square relative h-[200px]">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=Map"
                  alt="地図"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

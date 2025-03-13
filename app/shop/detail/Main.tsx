import Image from "next/image";
import { Shop } from "@/types";
import {
    MapPin,
    Clock,
    Phone,
    DollarSign,
    Tag,
    Car,
    CreditCard,
    Wifi,
    Users,
    Utensils,
    Wine,
    Ban,
    Baby,
    Globe,
    Star,
    StarHalf,
    Send,
    User,
  } from "lucide-react";

interface ReviewSelectionProps {
    averageRating: number;
  }


  
export default async function Main({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id } = searchParams;
  if (!id) return <div>ID が指定されていません。</div>;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/shops?id=${id}`);
  if (!res.ok) {
    return <div>データ取得エラーです</div>;
  }
  const jsondata = await res.json();
  const restaurantData: Shop = jsondata[0];
    const mainImage =
    restaurantData.photo?.pc?.l ||
    "/placeholder.svg?height=600&width=1200";

    const averageRating = 4.4;

        // ロゴ画像
    const logoImage =
    restaurantData.logo_image ||
    "/placeholder.svg?height=100&width=100";
    
    // Google Map 埋め込み用
    const lat = restaurantData.lat || 35.681236;
    const lng = restaurantData.lng || 139.767125;
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    const mapLink = `https://maps.google.com/maps?q=${lat},${lng}&z=15`;

    
    return (
        < div >
        {/* Restaurant Name and Image */ }
        <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-video w-full h-[400px] relative">
                <Image
                    src={mainImage}
                    alt={restaurantData.name || "店名"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center gap-3 mb-2">
                    {/* ロゴ画像 */}
                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-white">
                        <Image
                            src={logoImage}
                            alt="Logo"
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {restaurantData.name || "店名不明"}
                        </h1>
                        <p className="text-white/80 text-sm">
                            {restaurantData.name_kana || ""}
                        </p>
                    </div>
                </div>
                {/* ジャンル */}
                <div className="flex items-center gap-2">
                    <div className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-md inline-block text-sm font-medium">
                        焼肉・ホルモン
                    </div>
                    {/* ここに星マーク＋評価を表示 */}
                    <div className="p-4">
                        {averageRating > 0 && (
                            <div className="bg-yellow-500/90 text-white px-3 py-1 rounded-md inline-flex items-center text-sm font-medium">
                                <Star className="w-4 h-4 fill-white text-white mr-1" />
                                {averageRating.toFixed(1)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
                {/* Catch Copy */ }
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-xl font-medium text-center">
            {restaurantData.genre.catch || "キャッチコピーがありません"}
        </p>
        <p className="text-center text-muted-foreground mt-2">
            {restaurantData.shop_detail_memo || ""}
        </p>
    </div>

    {/* Restaurant Details */ }
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
            {/* Address */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <h2 className="font-semibold text-lg mb-1">住所</h2>
                            <p className="text-muted-foreground">
                                {restaurantData.address || "住所情報がありません"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                エリア: {restaurantData.large_area?.name || "不明"} &gt;{" "}
                                {restaurantData.middle_area?.name || "不明"} &gt;{" "}
                                {restaurantData.small_area?.name || "不明"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Access */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-start gap-3">
                        <Car className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <h2 className="font-semibold text-lg mb-1">アクセス</h2>
                            <p className="text-muted-foreground">
                                {restaurantData.access || "アクセス情報なし"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                最寄り駅: {restaurantData.station_name || "不明"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <h2 className="font-semibold text-lg mb-1">営業時間</h2>
                            <div className="space-y-1 text-muted-foreground">
                                <p>{restaurantData.open || "営業時間情報なし"}</p>
                                <p className="mt-2">
                                    <span className="font-medium">定休日:</span>{" "}
                                    {restaurantData.close || "不定休"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <h2 className="font-semibold text-lg mb-1">予算</h2>
                            <p className="text-muted-foreground">
                                {restaurantData.budget?.average || "不明"}
                            </p>
                            {restaurantData.budget_memo && (
                                <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted rounded-md">
                                    {restaurantData.budget_memo}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
            {/* Facilities */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <h2 className="font-semibold text-lg mb-3">設備・サービス</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Users className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                座席数: {restaurantData.capacity || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Utensils className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                個室: {restaurantData.private_room || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Car className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                駐車場: {restaurantData.parking || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Ban className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                {restaurantData.non_smoking || "禁煙情報なし"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CreditCard className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                カード: {restaurantData.card || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wifi className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                WiFi: {restaurantData.wifi || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Baby className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                子連れ: {restaurantData.child || "不明"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="flex-none h-4 w-4 text-primary" />
                            <span className="text-sm">
                                英語: {restaurantData.english || "不明"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course & Drink */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <h2 className="font-semibold text-lg mb-3">コース・ドリンク</h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-2">
                            <Utensils className="flex-none h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">コース料理</p>
                                <p className="text-sm text-muted-foreground">
                                    {restaurantData.course === "あり" ? "あり" : "なし"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Wine className="flex-none h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">飲み放題</p>
                                <p className="text-sm text-muted-foreground">
                                    {restaurantData.free_drink === "あり" ? "あり" : "なし"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-0">
                    <div className="aspect-square relative">
                        <iframe
                            src={mapSrc}
                            className="w-full h-full border-0"
                            title="Google Map"
                            aria-label="店舗の位置を示すGoogle Map"
                        ></iframe>
                    </div>
                    <div className="p-3 text-center">
                        <a
                            href={mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                        >
                            大きな地図で見る
                        </a>
                    </div>
                </div>
            </div>

            {/* Official Link */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 text-center">
                    <a
                        href={restaurantData.urls?.pc || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    >
                        公式サイトで詳細を見る
                    </a>
                </div>
            </div>
        </div>
    </div>
    </div >
    )
}
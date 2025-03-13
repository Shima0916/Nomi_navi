import Image from "next/image";
import { Shop } from "@/types";
import Link from "next/link";
import {
    MapPin,
    Clock,
    Car,
    DollarSign,
    Star,
    Users,
    Utensils,
    Wine,
    Ban,
    CreditCard,
    Wifi,
    Baby,
    Globe,
} from "lucide-react";
import ReviewSection, { Review } from "@/components/ui/ReviewSection";

const sampleReviews: Review[] = [
    {
        id: "1",
        userName: "沖縄グルメ好き",
        rating: 4.5,
        comment:
            "沖縄旅行で訪れました。もとぶ牛の焼肉は本当に美味しかったです！特にカルビとロースがジューシーで絶品でした。店内も清潔で、スタッフの方々の対応も丁寧でした。ただ、週末だったためか少し混雑していて、料理が出てくるまで少し時間がかかりました。それでも、また訪れたいお店です。",
        date: "2023-12-15",
        userImage: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "2",
        userName: "焼肉マスター",
        rating: 5,
        comment:
            "県内の焼肉店を数多く訪れましたが、ここのもとぶ牛は別格です。肉質が良く、特に「特選もとぶ牛盛り合わせ」は絶対に注文すべきです。接客も素晴らしく、肉の焼き方なども丁寧に教えてくれます。個室を予約したので、家族でゆっくり楽しめました。価格はやや高めですが、その価値は十分にあります。",
        date: "2023-11-20",
        userImage: "/placeholder.svg?height=50&width=50",
    },
    {
        id: "3",
        userName: "名護市民",
        rating: 4,
        comment:
            "地元民としてよく利用しています。安定した味で、特に平日のランチがおすすめです。コスパが良く、もとぶ牛を手頃に楽しめます。夜はやや混雑するので予約必須です。駐車場も広いので車でのアクセスも便利です。",
        date: "2024-01-05",
        userImage: "/placeholder.svg?height=50&width=50",
    },
];

export default async function Detail({
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
        restaurantData.photo?.pc?.l || "/placeholder.svg?height=600&width=1200";

    const averageRating = 4.4; // 仮の値

    // ロゴ画像
    const logoImage = restaurantData.logo_image || "/placeholder.svg?height=100&width=100";

    // Google Map 用
    const lat = restaurantData.lat || 35.681236;
    const lng = restaurantData.lng || 139.767125;
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    const mapLink = `https://maps.google.com/maps?q=${lat},${lng}&z=15`;

    console.log("😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫", restaurantData);
    return (
        <div>
            {/* 店舗画像・基本情報 */}
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
                    {/* ジャンルと評価 */}
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-md inline-block text-sm font-medium">
                            {restaurantData.genre?.catch || "キャッチコピーなし"}
                        </div>
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
                {/* ヒーローセクション全体の子要素として絶対配置のボタンを追加 */}

                <Link
                    href={`/schedule/select?id=${id}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-6"
                >
                    <button className="absolute bottom-4 right-4 z-20 bg-blue-500 text-white px-4 py-2 rounded shadow">
                        スケジュール調整へ
                    </button>
                </Link>
            </div>

            {/* キャッチコピー */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 my-6">
                <p className="text-xl font-medium text-center">
                    {restaurantData.catch || "キャッチコピーがありません"}
                </p>
                <p className="text-center text-muted-foreground mt-2">
                    {restaurantData.genre.catch}
                </p>
                <p className="text-center text-muted-foreground mt-2">
                    {restaurantData.shop_detail_memo || ""}
                </p>
            </div>

            {/* 店舗詳細（グリッドレイアウト） */}
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
                                    <p className="text-sm text-muted-foreground mt-1">
                                        エリア: {restaurantData.large_area?.name || "不明"} &gt;{" "}
                                        {restaurantData.middle_area?.name || "不明"} &gt;{" "}
                                        {restaurantData.small_area?.name || "不明"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* アクセス */}
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

                    {/* 営業時間 */}
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

                    {/* 予算 */}
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

                {/* 右カラム */}
                <div className="space-y-6">
                    {/* 設備・サービス */}
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

                    {/* コース・ドリンク */}
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

                    {/* マップ */}
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

                    {/* 公式サイトリンク */}
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

            {/* レビューセクション */}
            <div className="container mx-auto px-4 py-8">
                <ReviewSection reviews={sampleReviews} />
            </div>
        </div>
    );

}
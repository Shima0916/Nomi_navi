import { Shop } from "@/types";

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

    return (
        <div>
            <h1>{restaurantData.name}</h1>
            <p>{restaurantData.address}</p>
            <p>{restaurantData.tel}</p>
        </div>
    );
}
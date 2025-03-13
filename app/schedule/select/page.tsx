import { Shop } from "@/types";
import ScheduleAdjustment from "@/components/Eventcreate/ScheduleAdjustment";

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
  // ※jsondata が配列の場合は [0]、オブジェクトの場合はそのまま使用
  const restaurantData: Shop = jsondata[0];

  return <ScheduleAdjustment restaurantData={restaurantData} />;
}

import { NextResponse } from "next/server";
import { Shop } from "@/types";
 
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}
 
async function fetchHotpepperData(url: string): Promise<Shop[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new APIError(
      response.status,
      `API request failed: ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.results?.shop) {
    throw new APIError(404, "No shops found");
  }
  return data.results.shop;
}
 
function handleError(error: unknown): NextResponse {
  console.error("Error:", error);
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}
 
export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const key = process.env.HOTPEPPER_API_KEY;
    if (!key) {
      throw new APIError(500, "API key is not set");
    }
 
    const query = new URLSearchParams({
      key,
      format: "json",
      large_area: searchParams.get("large_area") || "Z098",
    });

    // 追加パラメータ（例として "id" を指定）
    const additionalParams = ["id"];
    additionalParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        query.set(param, value);
      }
    });
 
    const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`;
    const data = await fetchHotpepperData(url);
    console.log("😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫",url);

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
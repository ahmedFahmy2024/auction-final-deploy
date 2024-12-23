// components/dashboard/edit/AuctionEditForm.tsx
import { AUCTIONS, BASE_URL, PROJECTS } from "@/server/Api";
import PriceTable from "./PriceTable";
import AuctionScreen from "@/components/website/AuctionScreen";
import ToggleAuction from "./ToggleAuction";
import Link from "next/link";
import Bidding from "./Bidding";
import AuctionItems from "./AuctionItems";
import InstantBidding from "./InstantBidding";

async function fetchAuctionsProject(id: string) {
  const response = await fetch(`${BASE_URL}${PROJECTS}/${id}${AUCTIONS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 }, // Disable cache
  });

  if (!response.ok) {
    throw new Error("Failed to fetch auctions");
  }

  const auctions = await response.json();
  return auctions.data;
}

export default async function AuctionEditForm({ id }: { id: string }) {
  const auctions = await fetchAuctionsProject(id);

  return (
    <div className="my-32">
      <div className="flex items-center gap-4 md:gap-10 lg:w-1/2 justify-between">
        <h2 className="text-xl font-extrabold text-[#342D23]">شاشة العرض</h2>
        <div className="flex items-center gap-2">
          <Link
            href={`/auction/${id}`}
            className="bg-[#D8BA8E] rounded-full min-w-[200px] px-4 py-2 flex items-center justify-center text-[#342D23] font-extrabold text-lg"
          >
            عرض شاشة المزاد
          </Link>
          <Link
            href={`/dashboard/projects/${id}`}
            className="bg-[#342D23] rounded-full min-w-[200px] px-4 py-2 flex items-center justify-center text-[#D8BA8E] font-extrabold text-lg"
          >
            تعديل المزاد الأساسى
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <AuctionScreen />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuctionItems id={id} auctions={auctions} />
          <PriceTable />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Bidding />
          <InstantBidding />
        </div>
        <ToggleAuction projectId={id} />
      </div>
    </div>
  );
}

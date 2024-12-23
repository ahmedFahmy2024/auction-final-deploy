"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AuctionSwitchContextType = {
  auctionId: string | undefined;
  setAuctionId: (id: string | undefined) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  changeBidderNum: boolean;
  setChangeBidderNum: React.Dispatch<React.SetStateAction<boolean>>;
  openPriceRefresher: boolean;
  setOpenPriceRefresher: React.Dispatch<React.SetStateAction<boolean>>;
  deleteRefresh: boolean;
  setDeleteRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  changeToggleFields: boolean;
  setChangeToggleFields: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuctionSwitchContext = createContext<
  AuctionSwitchContextType | undefined
>(undefined);

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [auctionId, setAuctionId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [changeBidderNum, setChangeBidderNum] = useState(false);
  const [openPriceRefresher, setOpenPriceRefresher] = useState(false);
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const [changeToggleFields, setChangeToggleFields] = useState(false);

  return (
    <AuctionSwitchContext.Provider
      value={{
        auctionId,
        setAuctionId,
        loading,
        setLoading,
        changeBidderNum,
        setChangeBidderNum,
        openPriceRefresher,
        setOpenPriceRefresher,
        deleteRefresh,
        setDeleteRefresh,
        changeToggleFields,
        setChangeToggleFields,
      }}
    >
      {children}
    </AuctionSwitchContext.Provider>
  );
}

export function useAuctionSwitch() {
  const context = useContext(AuctionSwitchContext);
  if (context === undefined) {
    throw new Error("useAuctionSwitch must be used within an AuctionProvider");
  }
  return context;
}

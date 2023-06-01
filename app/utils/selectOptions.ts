import { Rank } from "@prisma/client";
import { SelectItemOptionsType } from "primereact/selectitem";
import { StudentT } from "../admin/students/page";
import { capitalizeEnum } from ".";

export function createOptionsFromEnum(enumValue: {}): SelectItemOptionsType {
  return Object.keys(enumValue).map((value) => ({
    label: capitalizeEnum(value),
    value,
  }));
}

export function createAvailableRanks(
  promotions: StudentT[0]["promotion"] = []
) {
  const availableRanks = Object.keys(Rank).filter(
    (rank) => !promotions.map((p) => p.rank).includes(rank as Rank)
  );

  return availableRanks.map((rank) => ({
    label: capitalizeEnum(rank),
    value: rank,
  })) as SelectItemOptionsType;
}

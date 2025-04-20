"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
interface FiltersProps {
  categories: string[];
  selectedCategory?: string;
}

export default function Filters({
  categories,
  selectedCategory,
}: FiltersProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      <Select
        value={selectedCategory}
        onValueChange={(value) => {
          router.push(`/?category=${value}`);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Kategori seçin" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

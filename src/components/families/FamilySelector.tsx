import type { Family } from "@/types/api/types";
import { useGetFamiliesQuery } from "../../../api/FamiliesApi";
import { Select } from "@radix-ui/themes";

type FamilySelectorProps = {
  value?: Family;
  onChange: (newValue?: Family) => void;
}

const FamilySelector = ({value, onChange}: FamilySelectorProps) => {
  const { data: families } = useGetFamiliesQuery();

  if (!families) return null;

  const handleChange = (value: string) => {
    const family = families.find(f => f.id === parseInt(value));
    onChange(family);
  }

  return (
    <Select.Root value={value?.id.toString()} onValueChange={handleChange}>
      <Select.Trigger placeholder={"Famille"} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Familles</Select.Label>
          {families.map((family => (
            <Select.Item key={family.id} value={family.id.toString()}>{family.name}</Select.Item>
          )))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default FamilySelector;
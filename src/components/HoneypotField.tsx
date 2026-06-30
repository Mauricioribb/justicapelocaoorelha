import { HONEYPOT_FIELD } from "@/lib/honeypot";

interface Props {
  id?: string;
}

export function HoneypotField({ id = "hp-cpv" }: Props) {
  return (
    <div
      className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <input
        id={id}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        readOnly
        data-1p-ignore
        data-lpignore="true"
        data-form-type="other"
      />
    </div>
  );
}

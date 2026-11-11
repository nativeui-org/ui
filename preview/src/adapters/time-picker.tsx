// The community picker has no web implementation. Keep the calendar's date
// and onChange contract while using the browser's accessible time control.
interface TimePickerProps {
  value: Date;
  minuteInterval?: number;
  disabled?: boolean;
  onChange?: (event: { type: "set" }, value: Date) => void;
}

export default function TimePicker({
  value,
  minuteInterval = 1,
  disabled,
  onChange,
}: TimePickerProps) {
  const time = `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
  return (
    <label className="flex flex-col gap-2 p-4 text-foreground">
      Time
      <input
        type="time"
        value={time}
        step={minuteInterval * 60}
        disabled={disabled}
        className="min-h-12 rounded-lg border border-input bg-background p-3 text-foreground"
        onChange={(event) => {
          if (!event.currentTarget.value || !event.currentTarget.validity.valid)
            return;
          const [hours, minutes] = event.currentTarget.value
            .split(":")
            .map(Number);
          const next = new Date(value);
          next.setHours(hours, minutes, 0, 0);
          onChange?.({ type: "set" }, next);
        }}
      />
    </label>
  );
}

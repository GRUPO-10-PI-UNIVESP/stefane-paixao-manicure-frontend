import React, { useState, useEffect } from "react";

interface DateTimePickerProps {
  initialDate?: string;
  initialTime?: string;
  onChange?: (datetime: string) => void;
  dateLabel?: string;
  timeLabel?: string;
  datePlaceholder?: string;
  timePlaceholder?: string;
  required?: boolean;
  dateError?: string;
  timeError?: string;
}

const formatTime = (time: string) => {
  // Format time to HH:MM
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  initialDate = "",
  initialTime = "",
  onChange,
  dateLabel = "Select Date",
  timeLabel = "Select Time",
  datePlaceholder = "",
  timePlaceholder = "",
  required = false,
  dateError = "",
  timeError = "",
}) => {
  const [date, setDate] = useState<string>(initialDate);
  const [time, setTime] = useState<string>(formatTime(initialTime));

  useEffect(() => {
    if (onChange && date && time) {
      const isoDateTime = new Date(
        `${date}T${
          !!time && time !== ":undefined" ? time : "00:00"
        }:00.000-03:00`
      );
      onChange(isoDateTime.toISOString());
    }
  }, [date, time, onChange]);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialTime) setTime(formatTime(initialTime));
  }, [initialDate, initialTime]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div className="flex flex-row items-center justify-between space-x-4">
      <div className="w-full">
        <label
          className="block font-default text-xs font-regular"
          htmlFor="date"
        >
          {dateLabel}
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          placeholder={datePlaceholder}
          required={required}
          className={`mt-2 px-4 py-2 border ${
            dateError ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            dateError ? "focus:ring-red-500" : "focus:ring-brand500"
          } focus:border-transparent`}
          aria-invalid={!!dateError}
          aria-describedby="dateError"
        />
        {dateError && (
          <p id="dateError" className="text-red-500 text-xs italic mt-1">
            {dateError}
          </p>
        )}
      </div>
      <div className="w-full">
        <label
          className="block font-default text-xs font-regular"
          htmlFor="time"
        >
          {timeLabel}
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
          placeholder={timePlaceholder}
          required={required}
          className={`mt-2 px-4 py-2 border w-full ${
            timeError ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            timeError ? "focus:ring-red-500" : "focus:ring-brand500"
          } focus:border-transparent`}
          aria-invalid={!!timeError}
          aria-describedby="timeError"
        />
        {timeError && (
          <p id="timeError" className="text-red-500 text-xs italic mt-1">
            {timeError}
          </p>
        )}
      </div>
    </div>
  );
};

export { DateTimePicker };

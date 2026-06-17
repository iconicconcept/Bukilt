"use client";

import { useEffect, useRef, useState } from "react";

import { markNotificationsAsRead } from "@/app/dashboard/vendor/notifications/action";

export default function NotificationBell({
  notifications,
}: {
  notifications: any[];
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleOpen() {
    setOpen((prev) => !prev);

    if (unread.length) {
      await markNotificationsAsRead(unread.map((n) => n.id));
    }
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={handleOpen} className="relative text-xl">
        🔔
        {unread.length > 0 && (
          <span
            className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            rounded-full
            text-xs
            px-2
            "
          >
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-80
            bg-white
            rounded-2xl
            shadow-lg
            p-4
            z-50
            "
        >
          <h3 className="font-bold mb-4">Notifications</h3>

          {notifications.length === 0 ? (
            <p className="text-sm text-slate-500">No notifications</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`
                    border-b
                    pb-3
                    ${item.read ? "" : "font-semibold"}
                    `}
                >
                  <p>{item.title}</p>

                  <p className="text-sm text-slate-500">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

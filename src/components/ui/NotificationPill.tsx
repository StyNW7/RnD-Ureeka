import React from 'react';
import { LuCheckCircle2, LuAlertCircle } from "react-icons/lu";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

interface NotificationPillProps {
  notif?: string;
  notifStatus?: 'success' | 'warn';
  animateInOut?: 'in' | 'out';
  notifMessage?:string
}

const NotificationPill: React.FC<NotificationPillProps> = ({ 
  notif, 
  notifStatus,
  animateInOut,
  notifMessage
}) => {
    const { theme } = useTheme();

    return (
        <div className="fixed top-28 left-5 z-30">
            <div className={`bg-white dark:bg-slate-600 rounded-lg border-gray-400 border p-3 shadow-lg w-96
                ${animateInOut === "in" ? "animate-in fade-in slide-in-from-top duration-700":
                "animate-out fade-out slide-out-to-top duration-700 transition"}`}>
                <div className="flex flex-row">
                    <div className="px-2">
                        {notifStatus === 'success' ? (
                        <LuCheckCircle2 className="text-green-600 dark:text-green-400 text-2xl" />
                        ) : (
                        <LuAlertCircle className="text-red-600 dark:text-red-400 text-2xl" />
                        )}
                    </div>
                    <div className="ml-2 mr-6">
                        <span className="font-semibold flex ">
                            { notif }
                            <Image 
                                width={1000}
                                height={1000}
                                src={theme === "dark" ? "/svg/DarkPaw.svg" : "/svg/PawLight.svg"}
                                alt="Paw icon"
                                loading="lazy"
                                className="ml-2 w-5 h-auto"
                            />
                        </span>
                        <span className="block text-gray-500 dark:text-gray-300">
                            {notifMessage}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPill;
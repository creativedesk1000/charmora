"use client";

import React, { useState } from "react";
import {
    Users,
    ShieldCheck,
    UserPlus,
    Search,
    MoreVertical,
    UserCog,
    ShieldAlert,
    ToggleLeft,
    ToggleRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toggleUserRole, toggleUserStatus } from "@/lib/actions";
import { toast } from "sonner";

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
    const [userList, setUserList] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = userList.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRoleToggle = async (id: string, currentRole: string) => {
        const res = await toggleUserRole(id, currentRole);
        if (res.success) {
            toast.success("Security clearance updated.");
            setUserList(userList.map(u =>
                u.id === id ? { ...u, role: currentRole === "ADMIN" ? "USER" : "ADMIN" } : u
            ));
        } else {
            toast.error(res.error);
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const res = await toggleUserStatus(id, currentStatus);
        if (res.success) {
            toast.success("Identity status toggled.");
            // For now we just revalidate, since status isn't in schema yet
            // we'll just mock the UI change
        }
    };

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-neutral-900 leading-tight">Elite Guard</h1>
                    <p className="text-neutral-500 text-sm mt-1 font-sans">Manage your client community and administrative roles.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 relative flex items-center group">
                    <Search className="absolute left-4 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email hash..."
                        className="w-full bg-white border border-neutral-100 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-4 focus:ring-purple-50 hover:shadow-md transition-all font-sans text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-neutral-100">
                                <th className="px-8 py-6">Human Profile</th>
                                <th className="px-6 py-6">Security Role</th>
                                <th className="px-8 py-6 text-center">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            <AnimatePresence mode="popLayout">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-neutral-50/50 transition-colors cursor-default"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-100 border-2 border-white shadow-sm ring-1 ring-neutral-100 group-hover:scale-110 transition-transform">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.name} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-serif font-bold text-neutral-900 group-hover:text-charmora-purple transition-colors">{user.name || "Anonymous Guest"}</span>
                                                    <span className="text-[10px] text-neutral-400 font-sans">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border w-fit ${user.role === "ADMIN" ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-neutral-50 text-neutral-500 border-neutral-100"
                                                }`}>
                                                {user.role === "ADMIN" ? <ShieldCheck size={14} /> : <UserCog size={14} />}
                                                <span className="text-[10px] font-black tracking-widest uppercase">{user.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => handleRoleToggle(user.id, user.role)}
                                                    className="p-2 rounded-xl text-neutral-400 hover:text-purple-600 hover:bg-white hover:shadow-md transition-all"
                                                    title="Toggle Security Role"
                                                >
                                                    {user.role === 'ADMIN' ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

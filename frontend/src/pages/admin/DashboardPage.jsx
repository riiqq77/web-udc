import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderOpen,
  Newspaper,
  Trophy,
  TrendingUp,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { dashboardService } from "@/services/api";
import toast from "react-hot-toast";

const chartData = [
  { month: "Jan", anggota: 95, portfolio: 60 },
  { month: "Feb", anggota: 100, portfolio: 65 },
  { month: "Mar", anggota: 108, portfolio: 70 },
  { month: "Apr", anggota: 112, portfolio: 74 },
  { month: "May", anggota: 120, portfolio: 80 },
  { month: "Jun", anggota: 127, portfolio: 84 }
];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        setStats(response.data);
      } catch (error) {
        toast.error("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-neutral-500">
        Memuat dashboard...
      </div>
    );
  if (!stats)
    return (
      <div className="p-8 text-center text-red-500">Gagal memuat data</div>
    );

  const statsCards = [
    {
      label: "Total Anggota",
      value: stats.total_anggota,
      icon: Users,
      change: "+12%",
      color: "text-royal-purple-600"
    },
    {
      label: "Total Portfolio",
      value: stats.total_portfolio,
      icon: FolderOpen,
      change: "+8%",
      color: "text-citron-600"
    },
    {
      label: "Total Berita",
      value: stats.total_berita,
      icon: Newspaper,
      change: "+5%",
      color: "text-blue-600"
    },
    {
      label: "Total Prestasi",
      value: stats.total_prestasi,
      icon: Trophy,
      change: "+15%",
      color: "text-amber-600"
    }
  ];

  const divisionData = stats.divisi_stats.map((d) => ({
    name: d.nama.split(" ")[0],
    count: d.anggota_count,
    fill: d.warna
  }));

  const recentActivity = [
    {
      action: "Pending Pendaftaran",
      detail: `${stats.total_pendaftaran_pending} pendaftaran perlu direview`,
      time: "Baru",
      type: "warning"
    },
    {
      action: "Pesan Belum Dibaca",
      detail: `${stats.total_pesan_unread} pesan masuk`,
      time: "Baru",
      type: "info"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Selamat datang kembali, Admin UDC
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 ${s.color}`}
                  >
                    <s.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp size={12} />
                    {s.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {s.value}
                </div>
                <div className="text-xs text-neutral-500 mt-1">{s.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              Perkembangan Anggota
            </h3>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#700143" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#700143" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#A3A3A3"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="anggota"
                  stroke="#700143"
                  strokeWidth={2}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-neutral-900 dark:text-white">
              Anggota per Divisi
            </h3>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={divisionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  stroke="#A3A3A3"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {divisionData.map((entry, i) => (
                    <rect key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="font-semibold text-neutral-900 dark:text-white">
            Aktivitas Terkini
          </h3>
          <Activity size={18} className="text-neutral-400" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {recentActivity.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${a.type === "success" ? "bg-green-500" : a.type === "warning" ? "bg-amber-500" : "bg-blue-500"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {a.action}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {a.detail}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 flex-shrink-0">
                  {a.time}
                </span>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="p-6 text-center text-sm text-neutral-500">
                Tidak ada aktivitas.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

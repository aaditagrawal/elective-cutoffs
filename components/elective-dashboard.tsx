"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
    electiveData,
    filterElectives,
    getDepartments,
    getStats,
    getDifficultyLevel,
    type Elective
} from "@/lib/electives";
import {
    Search,
    GraduationCap,
    Users,
    TrendingUp,
    TrendingDown,
    Building2,
    ChevronUp,
    ChevronDown,
    BookOpen,
    Layers,
    BarChart3
} from "lucide-react";

// Stats Card Component
function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
}: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
}) {
    return (
        <Card className="relative overflow-hidden border-white/10 bg-neutral-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400">{title}</CardTitle>
                <Icon className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
            </CardContent>
        </Card>
    );
}

// Elective Card Component
function ElectiveCard({ elective }: { elective: Elective }) {
    const difficulty = getDifficultyLevel(elective.lowestCGPA);

    return (
        <Card className="group relative overflow-hidden border-white/5 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-neutral-800 text-neutral-300 border-0"
                    >
                        {elective.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-mono border-neutral-700 text-neutral-400">
                        {elective.code}
                    </Badge>
                </div>
                <CardTitle className="text-base font-semibold leading-tight mt-2 line-clamp-2 text-white">
                    {elective.name}
                </CardTitle>
                <CardDescription className="text-xs text-neutral-500">
                    Department: {elective.department}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Min CGPA</div>
                        <div className={`text-lg font-bold font-mono ${difficulty.color}`}>
                            {elective.lowestCGPA.toFixed(2)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Max CGPA</div>
                        <div className="text-lg font-semibold font-mono text-neutral-300">
                            {elective.highestCGPA.toFixed(2)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Students</div>
                        <div className="text-lg font-semibold font-mono text-neutral-300">
                            {elective.students}
                        </div>
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Difficulty</span>
                        <span className={`font-medium ${difficulty.color}`}>{difficulty.level}</span>
                    </div>
                    {/* CGPA Range Bar */}
                    <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full"
                            style={{
                                marginLeft: `${(elective.lowestCGPA / 10) * 100}%`,
                                width: `${((elective.highestCGPA - elective.lowestCGPA) / 10) * 100}%`
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-600 mt-1 font-mono">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ElectiveDashboard() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [deptFilter, setDeptFilter] = useState("all");
    const [sortBy, setSortBy] = useState<"name" | "cutoff" | "students">("cutoff");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const stats = useMemo(() => getStats(), []);
    const departments = useMemo(() => getDepartments(), []);

    const filteredElectives = useMemo(() => {
        return filterElectives(
            typeFilter,
            deptFilter,
            search,
            sortBy,
            sortOrder
        );
    }, [typeFilter, deptFilter, search, sortBy, sortOrder]);

    const toggleSort = (newSortBy: typeof sortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(newSortBy);
            setSortOrder("asc");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                            Elective Cutoff Analysis
                        </h1>
                        <p className="mt-3 text-lg text-neutral-400 max-w-2xl mx-auto">
                            Explore CGPA cutoffs for Open Electives (OE) and Program Electives (PE I & PE II)
                            to make informed course selection decisions.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Electives"
                            value={stats.totalElectives}
                            subtitle={`${stats.oeCount} OE • ${stats.pe1Count} PE I • ${stats.pe2Count} PE II`}
                            icon={BookOpen}
                        />
                        <StatCard
                            title="Departments"
                            value={stats.departments}
                            subtitle="Offering electives"
                            icon={Building2}
                        />
                        <StatCard
                            title="Lowest Cutoff"
                            value={stats.lowestCutoff.toFixed(2)}
                            subtitle="Easiest to get"
                            icon={TrendingDown}
                        />
                        <StatCard
                            title="Highest Cutoff"
                            value={stats.highestCutoff.toFixed(2)}
                            subtitle="Most competitive"
                            icon={TrendingUp}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                            <Input
                                placeholder="Search electives by name, code, or department..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 bg-neutral-900/50 border-white/10 text-white placeholder:text-neutral-500"
                            />
                        </div>

                        {/* Type Filter */}
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-full md:w-40 bg-neutral-900/50 border-white/10 text-neutral-300">
                                <Layers className="h-4 w-4 mr-2 text-neutral-500" />
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="OE">Open Elective</SelectItem>
                                <SelectItem value="PE I">PE I</SelectItem>
                                <SelectItem value="PE II">PE II</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Department Filter */}
                        <Select value={deptFilter} onValueChange={setDeptFilter}>
                            <SelectTrigger className="w-full md:w-40 bg-neutral-900/50 border-white/10 text-neutral-300">
                                <Building2 className="h-4 w-4 mr-2 text-neutral-500" />
                                <SelectValue placeholder="Dept" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Depts</SelectItem>
                                {departments.map(dept => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleSort("cutoff")}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${sortBy === "cutoff"
                                        ? "bg-white/10 text-white"
                                        : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                    }`}
                            >
                                <BarChart3 className="h-4 w-4" />
                                Cutoff
                                {sortBy === "cutoff" && (sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                            </button>
                            <button
                                onClick={() => toggleSort("students")}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${sortBy === "students"
                                        ? "bg-white/10 text-white"
                                        : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                    }`}
                            >
                                <Users className="h-4 w-4" />
                                Students
                                {sortBy === "students" && (sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                            </button>
                            <button
                                onClick={() => toggleSort("name")}
                                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${sortBy === "name"
                                        ? "bg-white/10 text-white"
                                        : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-300"
                                    }`}
                            >
                                <GraduationCap className="h-4 w-4" />
                                Name
                                {sortBy === "name" && (sortOrder === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        {filteredElectives.length} Elective{filteredElectives.length !== 1 ? 's' : ''} Found
                    </h2>
                    {search || typeFilter !== "all" || deptFilter !== "all" ? (
                        <button
                            onClick={() => { setSearch(""); setTypeFilter("all"); setDeptFilter("all"); }}
                            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                        >
                            Clear Filters
                        </button>
                    ) : null}
                </div>

                {/* Electives Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredElectives.map((elective, idx) => (
                        <ElectiveCard key={`${elective.code}-${elective.type}-${idx}`} elective={elective} />
                    ))}
                </div>

                {filteredElectives.length === 0 && (
                    <div className="text-center py-16">
                        <GraduationCap className="mx-auto h-12 w-12 text-neutral-700" />
                        <h3 className="mt-4 text-lg font-medium text-neutral-300">No electives found</h3>
                        <p className="text-neutral-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 text-center text-sm text-neutral-500">
                <p>Data based on actual student allocations. Cutoffs may vary each semester.</p>
                <p className="mt-1">Use this as a reference, not a guarantee.</p>
            </footer>
        </div>
    );
}

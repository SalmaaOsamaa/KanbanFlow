import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ROUTES } from "../../router/routes";
import { ArrowRight, CheckSquare, Zap, Users, BarChart3 } from "lucide-react";

const MainPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: CheckSquare,
            title: "Task Management",
            description: "Organize and track your tasks with ease"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Quick and responsive interface for productivity"
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Work together seamlessly with your team"
        },
        {
            icon: BarChart3,
            title: "Analytics",
            description: "Track your progress and improve efficiency"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse bg-[oklch(25.7%_0.09_281.288_/_0.2)]"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse bg-[oklch(25.7%_0.09_281.288_/_0.2)] [animation-delay:1s]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[oklch(15.7%_0.09_281.288)] via-[oklch(25.7%_0.09_281.288)] to-[oklch(35.7%_0.09_281.288)]">
                        KanbanFlow
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                        Streamline your workflow with our powerful kanban board. 
                        Organize tasks, boost productivity, and achieve your goals.
                    </p>
                </header>

                <div className="flex justify-center mb-20">
                    <Button
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                        size="lg"
                        className="group px-8 py-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-[oklch(25.7%_0.09_281.288)] bg-gradient-to-r from-[oklch(15.7%_0.09_281.288)] to-[oklch(25.7%_0.09_281.288)] hover:from-[oklch(25.7%_0.09_281.288)] hover:to-[oklch(35.7%_0.09_281.288)]"
                    >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-transparent hover:border-[oklch(25.7%_0.09_281.288)] dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="mb-4 inline-flex p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300 bg-[oklch(25.7%_0.09_281.288)] bg-gradient-to-br from-[oklch(15.7%_0.09_281.288)] to-[oklch(25.7%_0.09_281.288)]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                        Start organizing your tasks today and experience the difference
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
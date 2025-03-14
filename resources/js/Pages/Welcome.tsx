import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="dark bg-gray-800 h-dvh max-w-5xl mx-auto px-4 text-white overflow-auto scroll-bar">
                <header>
                    <nav className="flex justify-between items-center gap-4">
                        <Link
                            href="/"
                            className="mr-auto flex items-center gap-2"
                        >
                            <img
                                src="/brand/logo-transparent.png"
                                className="size-16"
                                alt="company logo"
                                loading={"lazy"}
                            />
                            <span className="text-2xl text-cyan-200 hidden md:inline-block font-semibold">
                                Mauzodata Software
                            </span>
                            <span className="text-2xl font-semibold inline-block md:hidden">
                                MSI
                            </span>
                        </Link>

                        <Link href={route("login")}>Login</Link>
                        <Link href={route("register")}>Register</Link>
                    </nav>
                </header>

                <main>
                    <header className="my-10 space-y-5">
                        <h1 className="text-5xl">
                            Always take control of your shop finances
                        </h1>
                        <p className="text-lg text-gray-300 max-w-md">
                            Mauzodata is the best software for managing your
                            shop inventory and finances so you can easly
                            determine your sales, profits, expenses and stock
                            levels overtime.
                        </p>

                        <Button onClick={() => router.visit(route('register'))}>Create free account <ChevronRight className="ml-2" /></Button>
                    </header>

                    <section className="mb-10">
                        <img loading="lazy" src="/images/welcome-banner1.png" alt="welcome banner 1" />
                    </section>
                </main>
            </div>
        </>
    );
}

import Link from "next/link";

// example 1
// export default function DashboardMainLayout({feed, stats}){
//     return (
//         // example 1
//         // <div style={{display: "flex", gap:"20px"}}>
//         //     <div className="flex-2">{feed}</div>
//         //     <div className="flex-1">{stats}</div>
//         // </div>
//
//     )
// }
export default function DashboardMainLayout({tab1, tab2}){
    return (
        
        <div>
            <nav className={"mb-3"}>
                <Link href={"/dashboard-main/tab1"}>Tab 1</Link> | {" "}
                <Link href={"/dashboard-main/tab2"}>Tab 2</Link> | {" "}
            </nav>
            <div>
                {tab1}
                {tab2}
            </div>
        </div>

    )
}
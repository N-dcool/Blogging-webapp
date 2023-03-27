import { Inter } from "next/font/google";
import toast from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

// Max post to query per page
const LIMIT = 1;

export async function getServerSideProps(context) {}

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => toast.success("Pooja Don")}>Toast Me!</button>
        </div>
    );
}

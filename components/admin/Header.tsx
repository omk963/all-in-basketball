import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
    return (
        <header>
            <div>
                <h2 className="text-2xl font-semibold">
                    {session?.user?.name}
                </h2>
                <p className="text-base">Monitor all your users here</p>
            </div>

            <p>Search fx</p>
        </header>
    );
};

export default Header;
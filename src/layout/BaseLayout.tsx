import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-gray-300  dark:bg-gray-900 overflow-hidden relative">
      <div className="absolute bottom-[-300px] right-[-200px] w-[800px] h-[800px] bg-no-repeat bg-contain bg-right z-0">
        <div className="block dark:hidden w-full h-full bg-[url('./logoBackground.png')] bg-contain bg-no-repeat" />
        <div className="hidden dark:block w-full h-full bg-[url('./darkLogoBackground.png')] bg-contain bg-no-repeat" />
      </div>

      <div className="flex h-full w-full p-14 pr-35 pl-35 relative z-10">
        <Sidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default BaseLayout;

import { Header, SideBar } from "./_components";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

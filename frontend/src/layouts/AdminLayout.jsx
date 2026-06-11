import Sidebar from "../components/Sidebar/Sidebar";

function AdminLayout({ children }) {

  return (

    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

      <Sidebar />

      <main
  className="
    md:ml-64
    overflow-x-auto
    p-4
    md:p-6
    lg:p-8
    dark:text-white
    transition-colors
    duration-300
    min-h-screen
  "
>

        {children}

      </main>

    </div>

  );

}

export default AdminLayout;
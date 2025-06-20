export default function DashboardNavbar() {
  return (
    <header className="flex justify-between items-center px-4 py-2 border-b bg-background">
      <span className="text-sm font-semibold text-muted-foreground">
        Admin Panel
      </span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Admin</span>
        <img
          src="https://images.unsplash.com/photo-1588534331122-77ac46322dd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFkbWlufGVufDB8fDB8fHww"
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
}

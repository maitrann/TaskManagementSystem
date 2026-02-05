# TaskManagementSystem
Hệ thống quản lý công việc đơn giản gồm Backend (.NET Web API) và Frontend (Angular).
Database sử dụng Supabase (PostgreSQL) và đã cấu hình sẵn.

Công nghệ sử dụng
Backend: ASP.NET Web API, Entity Framework Core, JWT
Frontend: Angular
Database: Supabase (PostgreSQL)

Hướng dẫn chạy lệnh CMD cho Project:

1/ Chạy Backend:
cd backend\TaskServerBE\TaskMS.Server
dotnet run --urls "https://localhost:7278"
=> https://localhost:7278
hoặc URL swagger https://localhost:7278/swagger/index.html
2/ Chạy Frontend:
cd frontend\taskms.client
npm install
ng serve
=> http://localhost:4200

Authentication
- Backend sử dụng JWT
- Frontend lưu token trong localStorage
- Các API yêu cầu đăng nhập sẽ tự động gửi token

Database
- Sử dụng Supabase (PostgreSQL)
- Connection string đã được cấu hình sẵn trong backend
- Không cần cài PostgreSQL local
- Không cần migrate hay cấu hình thêm

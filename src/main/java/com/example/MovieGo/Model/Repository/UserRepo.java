package com.example.MovieGo.Model.Repository;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.stereotype.Repository;
import com.example.MovieGo.Model.Entity.Users;

@Repository
public class UserRepo {

    // Lấy tất cả user
    public ArrayList<Users> getAllUsers() throws Exception {
        ArrayList<Users> list = new ArrayList<>();

        Class.forName(BaseConnection.nameClass);
        Connection con = DriverManager.getConnection(BaseConnection.url, BaseConnection.username,
                BaseConnection.password);

        PreparedStatement ps = con.prepareStatement("SELECT * FROM users");
        ResultSet rs = ps.executeQuery();

        while (rs.next()) {
            int id = rs.getInt("userId");
            String fullName = rs.getString("fullName");
            String email = rs.getString("email");
            String password = rs.getString("password");
            String phone = rs.getString("phone");
            String role = rs.getString("role");
            String status = rs.getString("status");
            Timestamp createdAt = rs.getTimestamp("createdAt");

            Users user = new Users(
                    id,
                    fullName,
                    email,
                    password,
                    phone,
                    role != null ? Users.Role.valueOf(role) : null,
                    status != null ? Users.Status.valueOf(status) : null,
                    createdAt != null ? createdAt.toLocalDateTime() : null);

            list.add(user);
        }

        rs.close();
        ps.close();
        con.close();

        return list;
    }

    // Lấy user theo ID
    public Users getUserById(int id) throws Exception {
        Class.forName(BaseConnection.nameClass);
        Connection con = DriverManager.getConnection(BaseConnection.url, BaseConnection.username,
                BaseConnection.password);

        PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE userId = ?");
        ps.setInt(1, id);
        ResultSet rs = ps.executeQuery();

        Users user = null;

        if (rs.next()) {
            int userId = rs.getInt("userId");
            String fullName = rs.getString("fullName");
            String email = rs.getString("email");
            String password = rs.getString("password");
            String phone = rs.getString("phone");
            String role = rs.getString("role");
            String status = rs.getString("status");
            Timestamp createdAt = rs.getTimestamp("createdAt");

            user = new Users(userId, fullName, email, password, phone, null, null, null);
        }

        rs.close();
        ps.close();
        con.close();

        return user;
    }

    public void addUser(Users user) throws Exception {
        Class.forName(BaseConnection.nameClass);
        Connection con = DriverManager.getConnection(BaseConnection.url, BaseConnection.username,
                BaseConnection.password);

        PreparedStatement ps = con.prepareStatement(
                "INSERT INTO users(fullName, email, password, phone, role, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)");

        ps.setString(1, user.getFullName());
        ps.setString(2, user.getEmail());
        ps.setString(3, user.getPassword());
        ps.setString(4, user.getPhone());
        ps.setString(5, user.getRole().name());
        ps.setString(6, user.getStatus().name());
        ps.setTimestamp(7, Timestamp.valueOf(LocalDateTime.now()));

        ps.executeUpdate();
        ps.close();
        con.close();
    }

    public void updateUserById(Users user) throws Exception {
        Class.forName(BaseConnection.nameClass);
        Connection con = DriverManager.getConnection(BaseConnection.url, BaseConnection.username,
                BaseConnection.password);

        PreparedStatement ps = con.prepareStatement(
                "UPDATE users SET fullName = ?, email = ?, password = ?, phone = ?, role = ?, status = ? WHERE userId = ?");

        ps.setString(1, user.getFullName());
        ps.setString(2, user.getEmail());
        ps.setString(3, user.getPassword());
        ps.setString(4, user.getPhone());
        ps.setString(5, user.getRole().name());
        ps.setString(6, user.getStatus().name());
        ps.setInt(7, user.getUserId());

        ps.executeUpdate();
        ps.close();
        con.close();
    }

    public void deleteUserById(int id) throws Exception {
        Class.forName(BaseConnection.nameClass);
        Connection con = DriverManager.getConnection(BaseConnection.url, BaseConnection.username,
                BaseConnection.password);
        PreparedStatement ps = con.prepareStatement("DELETE FROM users WHERE userId = ?");
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
        con.close();
    }

    private Users mapResultSetToUser(ResultSet rs) throws Exception {
        Users u = new Users();
        u.setUserId(rs.getInt("userId"));
        u.setFullName(rs.getString("fullName"));
        u.setEmail(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        u.setPhone(rs.getString("phone"));

        String roleStr = rs.getString("role");
        String statusStr = rs.getString("status");

        if (roleStr != null)
            u.setRole(Users.Role.valueOf(roleStr));
        if (statusStr != null)
            u.setStatus(Users.Status.valueOf(statusStr));

        Timestamp ts = rs.getTimestamp("createdAt");
        if (ts != null)
            u.setCreatedAt(ts.toLocalDateTime());

        return u;
    }
}
// DDDDDDDDDDDDDDDDDDD
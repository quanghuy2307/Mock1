INSERT INTO 
    users ("full_name", "birthday", "sex", "address", "phone_number", "email", "password") 
VALUES 
    ('Le Huy', '2000-07-23', 'Male', 'Ha Noi', '0337560589', 'huylq23072000@gmail.com', '$2b$10$h7lkSn9gRo3rjNprDJ/Ag.xvS7hZwLbnUbc.JnXocRrvJ6zMffh5y'), 
    ('Le Hanh', '2003-10-26', 'Female', 'Ha Noi', '0987560588', 'hanhlt26102000@gmail.com', '$2b$10$VX9T5Rp1MlRM/XMHGyLMAOOKevl3B6PdyYuAr.GgxF7qw8D3yWGny'), 
    ('Tran Thuyet', '2000-07-23', 'Male', 'Hai Duong', '0912861512', 'thuyetmt23072000@gmail.com', '$2b$10$2GmcJ8xVPdpxHx81ObORq.9JJTz67LXxpbMN8vBSUFC4oUQSFp/Ia'), 
    ('Nguyen Hoang', '1999-07-23', 'Male', 'Bac Giang', '0823968976', 'hoangnn23071999@gmail.com', '$2b$10$3KWpUfuSfvA1lC3bxXaIW.6jI2x174uWWecekGcaKNq4VnedJVIPG'), 
    ('Tran Huy', '2000-07-23', 'Male', 'Ha Noi', '0966006240', 'huytq23072000@gmail.com', '$2b$10$dfvWYG0eUe8zveChFkvcwuH4Wl3xb1sdnhWcqq6yyFySnOxL41pGe'), 
    ('Trieu Vy', '2000-07-23', 'Female', 'Hai Duong', '0937560555', 'vyth14092000@gmail.com', '$2b$10$gwHa8AOLC8wjBSpMWlC4OOXzZ4jvAgxO/NukVKR5vfWbLqsUZGO06'), 
    ('Kieu Phuong', '2000-07-23', 'Male', 'Ha Noi', '0969044253', 'phuongkd01012000@gmail.com', '$2b$10$0H2BBnT9xjzBIJBKzhfrIOG9ME6U2BJp/ZoxdNa.8Lzv20DL7Y8Ou'), 
    ('Kieu Ngoc', '2000-07-23', 'Male', 'Ha Noi', '0989662185', 'ngockt23072000@gmail.com', '$2b$10$6rTQIyzvdW.6Bdow.PZCJ.B6gFYfYh1q8C4moR/Uc91fU9ihHLPOy'), 
    ('Phung Duc', '2000-07-23', 'Male', 'Ha Noi', '0337560589', 'ducpm23072000@gmail.com', '$2b$10$Btw8unq/LayOyeBDtcV9Ouj7VMDiJ8aLXjD/cStIapzaKgIGfnTwC'), 
    ('Nguyen Ha', '1999-07-23', 'Female', 'Hai Phong', '0343257188', 'hant23072000@gmail.com', '$2b$10$RhVL7e9oud809TaDdhd6fOJMk8q.6omhK6LPCYtKjCUyCKVtMha0m');

INSERT INTO 
    questions ("content", "score") 
VALUES 
    ('JavaScript có thể làm gì trong trang web?', 10), 
    ('Javascript là ngôn ngữ thông dịch hay biên dịch?', 10), 
    ('Phát biểu nào sau đây đúng?', 10), 
    ('Javascript là ngôn ngữ kịch bản có thể giấu được mã nguồn không?', 10), 
    ('Javascript có các kiểu dữ liệu nào?', 10), 
    ('Các quy tắc cơ bản trong JavaScript?', 10), 
    ('Cách hiện 1 giá trị hay biểu thức?', 10), 
    ('Chọn 2 phát biểu đúng?', 10), 
    ('Chọn lệnh Javascript đúng để xuất ra trang web giá trị của biến x?', 10), 
    ('Mục đích của JavaScript?', 10);

INSERT INTO 
    options ("question_id", "content", "is_correct") 
VALUES 
    (1, 'JavaScript dùng để viết game trong trang web.', 'false'), 
    (1, 'Kiểm tra hợp lệ dữ liệu trong form.', 'false'), 
    (1, 'Giúp đổi nội dung trang, định dạng của trang.', 'false'), 
    (1, 'Các đáp án trên đều đúng.', 'true'), 
    (2, 'Thông dịch.', 'true'), 
    (2, 'Biên dịch.', 'false'), 
    (2, 'Cả 2 đều đúng.', 'false'), 
    (2, 'Không đáp án nào đúng.', 'false'), 
    (3, 'Javascript là một trong ba kỹ thuật cơ bản để tạo nên trang web.', 'true'), 
    (3, 'Javascript là ngôn ngữ lập trình, giúp viết code trong trang web để thực hiện tính toán, xử lý nội dung và định dạng trang web.', 'true'), 
    (3, 'HTML giúp bố trí thông tin, CSS giúp định dạng thông tin, JavaScript giúp tính toán và tạo hành động theo tình huống.', 'true'), 
    (3, 'HTML được sử dụng làm ngôn ngữ lập trình phía Server.', 'false'), 
    (4, 'Không giấu được vì các kịch bản chạy ở Client.', 'true'), 
    (4, 'Giấu được vì chương trình hoạt động độc lập với trình duyệt.', 'false'), 
    (4, 'Cả 2 phát biểu đều sai.', 'false'), 
    (4, 'Cả 2 phát biểu đều đúng.', 'false'), 
    (5, 'number, string, boolean, bigint.', 'false'), 
    (5, 'number, undefined, symbol, object.', 'false'), 
    (5, 'number, string, null, bigint, symbol.', 'false'), 
    (5, 'Tất cả các đáp án trên.', 'true'), 
    (6, 'Code JavaScript đặt trong thẻ.', 'false'), 
    (6, 'Mỗi lệnh Javascript kết thúc bằng dấu chấm phẩy.', 'false'), 
    (6, 'Javascript phân biệt chữ hoa chữ thường.', 'false'), 
    (6, 'Dùng // để chủ thích 1 dòng, dùng /* */ để chú thích nhiều dòng.', 'false'), 
    (6, 'Các đáp án trên đều đúng.', 'true'), 
    (7, 'Dùng lệnh document.write().', 'true'), 
    (7, 'Ghi vào thuộc tính innerHTML của tag.', 'true'), 
    (7, 'Dùng lệnh alert().', 'true'), 
    (7, 'Lệnh console.log().', 'true'), 
    (7, 'Không cách nào đúng.', 'false'), 
    (8, 'alert() là hàm để nhập dữ liệu từ user.', 'false'), 
    (8, 'confirm() là hàm trả về true/false để user xác nhận điều gì đó.', 'true'), 
    (8, 'prompt() là hàm dùng để thông báo lỗi.', 'false'), 
    (8, 'console.log() là lệnh giúp web developer debug lỗi.', 'true'), 
    (9, 'document.getElementbyid("kq").innerhtml=x;', 'false'), 
    (9, 'windows.write(x);', 'true'), 
    (9, 'console.write(x);', 'true'), 
    (9, 'document.write(x);', 'true'), 
    (10, 'JavaScript được tạo ra với mục đích xử lý các tác vụ phía Client.', 'false'), 
    (10, 'JavaScript được tạo ra với mục đích tạo nên tính tương tác cho trang web.', 'false'), 
    (10, '2 phát biểu đểu đúng.', 'true'), 
    (10, '2 phát biểu đểu sai.', 'false');
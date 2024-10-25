drop table board;
drop table comment;

select * from board;
select * from comment;
select * FROM board WHERE no = 33;

create table board (
	no INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20),
    writer VARCHAR(10) DEFAULT "익명",
    content TEXT,
    url VARCHAR(200),
    count INT DEFAULT 0,
    mbti_type VARCHAR(20),
    write_date DATETIME DEFAULT current_timestamp
);

create table comment (
	comment_code INT AUTO_INCREMENT PRIMARY KEY,
	comment_writer VARCHAR(10) DEFAULT "익명",
    comment_content TEXT,
    comment_date DATETIME DEFAULT current_timestamp,
    no INT,
    FOREIGN KEY (no) REFERENCES board(no),
    parent_code INT DEFAULT 0,
    delete_code BOOLEAN DEFAULT 0
);

select * from board;

DELETE from board WHERE title = "gd";


select * from board JOIN comment USING (no);

insert into board (title, writer, content, mbti_type) VALUES ("ㅎㅇㅎㅇ", "배영운", "인사가 되는지 테스트 중입니다. 글 길게쓰면 어떻게 나오는 지도 테스트 중입니다.", "ISTP");

insert into board (title, content, mbti_type) VALUES ("안녕하세여", "2222", "ISTP");

insert into board (title, content, mbti_type) VALUES ("ENFJ게시판 테스트입니다.", "익명", "ENFJ");


insert into comment (comment_writer, comment_content, no) VALUES ("익명", "ㅎㅇ요", 3);

insert into comment (comment_writer, comment_content, no, parent_code) VALUES ("익명", "ㅎㅇ요", 3, 1);
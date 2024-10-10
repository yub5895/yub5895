drop table board;

create table board (
	no INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20),
    writer VARCHAR(10) DEFAULT "익명",
    content TEXT,
    url VARCHAR(200),
    count INT DEFAULT 0,
    date DATETIME DEFAULT NOW()
);

create table comment (
	comment_code INT AUTO_INCREMENT PRIMARY KEY,
	comment_writer VARCHAR(10) DEFAULT "익명",
    comment_content TEXT,
    comment_date DATETIME DEFAULT NOW(),
    no INT,
    FOREIGN KEY (no) REFERENCES board(no)
);

select * from board;

insert into board (title, writer, content) VALUES ("ㅎㅇㅎㅇ", "배영운", "인사가 되는지 테스트 중입니다. 글 길게쓰면 어떻게 나오는 지도 테스트 중입니다.");

insert into board (title, content) VALUES ("안녕하세여", "2222");

insert into board (title, content) VALUES ("진짜글써지나 테스트중 ㅋㅋㅎㅎ", "1111");

insert into board (title, writer, content) VALUES ("제목길게써보기ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ", "엠비티아이추종자", "1111");
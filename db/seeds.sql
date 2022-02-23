INSERT INTO department 
    (name)
VALUES
    ('Math'),
    ('English'),
    ('Social Studies'),
    ('Science'),
    ('Adminstration');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Teacher Aide', 20000, 1),
    ('Teacher', 35000, 2),
    ('Lead Teacher', 45000, 3),
    ('Department Chair', 50000, 4),
    ('Assistant Principal', 65000, 5),
    ('Principal', 80000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, 5),
    ('Jane', 'Doe', 4, 6),
    ('Susie', 'Creamcheese', 1, 5),
    ('Danny', 'Creamcheese', 3, 6),
    ('Boss', 'Man', 6, null);
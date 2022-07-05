INSERT INTO department 
    (name)
VALUES 
    ('sales'),
    ('engineering'),
    ('manager');

INSERT INTO role (title, salary, department_id)
VALUES
    ('software engineer', 120000, 2),
    ('Sales Lead', 100000, 1),
    ('Operations Manager', 140000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mitri', 'Chaaya', 3, 1),
    ('Joe', 'Chaaya', 2, 1),
    ('Mike', 'Chaaya', 1, 1);
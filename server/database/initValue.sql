BEGIN;

    INSERT INTO customer
        (name, email,password,phone,img,type)
    VALUES
        ('يوسف القواسمي', '151037@ppu.edu.ps', '0', '0599503807', '', 1);

    INSERT INTO record
        (customer_name,description,date,amount)
    VALUES
        ('يوسف القواسمي', 'حليب', '11/10/2019', 7.5),
        ('يوسف القواسمي', 'خبز', '11/20/2019', 4)
    ;

    COMMIT;



-- BEGIN;

--     INSERT INTO customer
--         (name, email,password,phone,img,type)
--     VALUES
--         ('يوسف القواسمي', '151037@ppu.edu.ps', '0', '0599503807', '', 1);

--     INSERT INTO record
--         (customer_id,description,date,amount)
--     VALUES
--         (1, 'حليب', '11/10/2019', 7.5),
--         (1, 'خبز', '11/20/2019', 4)

--     ;

--     COMMIT;
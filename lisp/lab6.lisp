(let ((firstLst '(1 2 3 4 5)) (secondLst '(2 4 6 5 8 10)))
    (defvar concatLst (append firstLst secondLst)))


(defvar sum 0)


(defun sumSet (lst)
    (when lst
        (let ((head (car lst)))
         (let ((a ((lambda (x) (mod x 2)) head)))
             (if (= a 0)
                 (incf sum head))
             (let ((tail (cdr lst)))
              (sumSet tail)))))
        
    
    (return-from sumSet sum))


(let ((res (sumSet concatLst)))
    (print res))

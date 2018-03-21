(let ((firstLst '(1 2 3 4 5)) (secondLst '(2 4 6 5 8 10)))
    (defvar concatLst (append firstLst secondLst)))




(defun sumSet (lst &optional (sum 0))
    (when lst
         (let ((headStatus (mod (car lst) 2)))
             (if (= headStatus 0)
                 (sumSet (cdr lst)))
             (sumSet (cdr lst) (incf sum (car lst)))))
    (return-from sumSet sum ))

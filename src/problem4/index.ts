/*
Complexity:
  - Time Complexity: O(n)T - The loop runs n times.
 -  Space Complexity: O(1) - Constant space is used, regardless of input size.
*/
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/*
Complexity:
  - Time Complexity: O(n) - n recursive calls are made.
  - Space Complexity: O(1) - The recursion stack grows with n
*/

function sum_to_n_b(n: number): number {
    if (n === 1) return 1;
    return n + sum_to_n_b(n - 1);
}

/*
Complexity:
  - Time Complexity: O(1) - The result is calculated in constant time using a mathematical formula.
  - Space Complexity: O(1) - No additional space is required.
*/

function sum_to_n_c(n: number): number {
    return (n * (n + 1)) / 2;
}

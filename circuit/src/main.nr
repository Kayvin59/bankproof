fn main(balance: Field, threshold: pub Field) -> pub bool {
    let balance_int = balance as u64;
    let threshold_int = threshold as u64;
    balance_int >= threshold_int
}

#[test]
fn test_main() {
    let balance = 100;
    let threshold = 50;
    assert(main(balance, threshold) == true);

    let balance = 30;
    let threshold = 50;
    assert(main(balance, threshold) == false);
}

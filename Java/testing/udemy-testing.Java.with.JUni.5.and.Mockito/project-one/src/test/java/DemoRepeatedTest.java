import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class DemoRepeatedTest {

    Calculator calculator;

    @BeforeEach
    void beforeEachTestMethod() {
        calculator = new Calculator();
        System.out.println("Executing @BeforeEach method.");
    }

    @DisplayName("Division by zero")
    @RepeatedTest(value=3, name="{displayName}. Repetition {currentRepetition} of" +
            "{totalRepetitions}")
    void testIntegerDivision_WhenDividendIsDividedByZero_ShouldThrowArithmeticException() {
        System.out.println("Running Division by zero");
        // Arrange
        int dividend = 4;
        int divisor = 0;
        String expectedExceptionMessage = "/ by zero";

        // Act & Assert
        ArithmeticException actualException = assertThrows(ArithmeticException.class, () -> {
            // Act
            calculator.integerDivision(dividend, divisor);
        }, "Division by zero should have thrown an arithmetic exception");

        // Assert
        assertEquals(expectedExceptionMessage, actualException.getMessage(),
                "Unexpected exception message");
    }
}

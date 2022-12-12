function(longExpression1, longExpression2, longExpression3,
		 longExpression4, longExpression5);
		 
var = function1(longExpression1,
				function2(longExpression2,
						  longExpression3));
			
// High level break			
longName1 = longName2 * (longName3 + longName4 - longName5)
			+ 4 * longname6; // PREFER
			
//CONVENTIONAL INDENTATION
someMethod(int anArg, Object anotherArg, String yetAnotherArg,
		   Object andStillAnother) {
	...
}

//INDENT 8 SPACES TO AVOID VERY DEEP INDENTS
private static synchronized horkingLongMethodName(int anArg,
		Object anotherArg, String yetAnotherArg,
		Object andStillAnother) {
	...
}

// Line wrapping for if statements should generally use the 8-space rule
if ((condition1 && condition2)
		|| (condition3 && condition4)
		||!(condition5 && condition6)) {
	doSomethingAboutIt();
}

// Ternery
alpha = (aLongBooleanExpression) ? beta : gamma;

alpha = (aLongBooleanExpression) ? beta
								 : gamma;
								 
alpha = (aLongBooleanExpression)
		? beta
		: gamma;
		
my_var = (somethinglikethis
          .where(we=do_things)
          .where(we=domore)
          .where(we=everdomore))
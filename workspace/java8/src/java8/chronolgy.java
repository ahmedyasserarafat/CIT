package java8;

import java.time.chrono.Chronology;
import java.util.Optional;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Stream;

public class chronolgy {
	
 public static void main(String[] args) {
	Set<Chronology> kk=Chronology.getAvailableChronologies();
	
    MathOperation addition = (a,b) -> a + b;
	
}
}
@FunctionalInterface
 interface MathOperation {
    public int operation(int a, int b);
 }
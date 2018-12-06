package com.intellectdesign.canvas.test;

import static com.intellectdesign.canvas.proxycaller.ProxyCaller.on;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Test;

import com.intellectdesign.canvas.proxycaller.ProxyCallerException;
import com.intellectdesign.canvas.test.Test2.ConstructorType;
import com.intellectdesign.canvas.test.Test3.MethodType;

/**
 * This class contains the Proxy Caller Test
 * 
 * @version 1.0
 */
public class ProxyCallerTest
{

	@Test
	public void testOn()
	{
		assertEquals(on(Object.class), on("java.lang.Object"));
		assertEquals(on(Object.class).get(), on("java.lang.Object").get());
		assertEquals(Object.class, on(Object.class).get());
		assertEquals("abc", on((Object) "abc").get());
		assertEquals(1, on(1).get());

		try
		{
			on("asdf");
			fail();
		} catch (ProxyCallerException expected)
		{
			//Ignore
		}
	}

	@Test
	public void testConstructors()
	{
		assertEquals("", on(String.class).create().get());
		assertEquals("abc", on(String.class).create("abc").get());
		assertEquals("abc", on(String.class).create("abc".getBytes()).get());
		assertEquals("abc", on(String.class).create("abc".toCharArray()).get());
		assertEquals("b", on(String.class).create("abc".toCharArray(), 1, 1).get());

		try
		{
			on(String.class).create(new Object());
			fail();
		} catch (ProxyCallerException expected)
		{
			//Ignore
		}
	}

	@Test
	public void testConstructorsWithAmbiguity()
	{
		Test2 test;

		test = on(Test2.class).create().get();
		assertEquals(null, test.n);
		assertEquals(ConstructorType.NO_ARGS, test.constructorType);

		test = on(Test2.class).create("abc").get();
		assertEquals("abc", test.n);
		assertEquals(ConstructorType.OBJECT, test.constructorType);

		test = on(Test2.class).create(new Long("1")).get();
		assertEquals(1L, test.n);
		assertEquals(ConstructorType.NUMBER, test.constructorType);

		test = on(Test2.class).create(1).get();
		assertEquals(1, test.n);
		assertEquals(ConstructorType.INTEGER, test.constructorType);

		test = on(Test2.class).create('a').get();
		assertEquals('a', test.n);
		assertEquals(ConstructorType.OBJECT, test.constructorType);
	}

	@Test
	public void testMethods()
	{
		// Instance methods
		// ----------------
		assertEquals("", on((Object) " ").call("trim").get());
		assertEquals("12", on((Object) " 12 ").call("trim").get());
		assertEquals("34", on((Object) "1234").call("substring", 2).get());
		assertEquals("12", on((Object) "1234").call("substring", 0, 2).get());
		assertEquals("1234", on((Object) "12").call("concat", "34").get());
		assertEquals("123456", on((Object) "12").call("concat", "34").call("concat", "56").get());
		assertEquals(2, on((Object) "1234").call("indexOf", "3").get());
		assertEquals(2.0f, on((Object) "1234").call("indexOf", "3").call("floatValue").get());
		assertEquals("2", on((Object) "1234").call("indexOf", "3").call("toString").get());

		// Static methods
		// --------------
		assertEquals("true", on(String.class).call("valueOf", true).get());
		assertEquals("1", on(String.class).call("valueOf", 1).get());
		assertEquals("abc", on(String.class).call("valueOf", "abc".toCharArray()).get());
		assertEquals("abc", on(String.class).call("copyValueOf", "abc".toCharArray()).get());
		assertEquals("b", on(String.class).call("copyValueOf", "abc".toCharArray(), 1, 1).get());
	}

	@Test
	public void testVoidMethods()
	{
		// Instance methods
		// ----------------
		Test4 test4 = new Test4();
		assertEquals(test4, on(test4).call("i_method").get());

		// Static methods
		// --------------
		assertEquals(Test4.class, on(Test4.class).call("s_method").get());
	}

	@Test
	public void testMethodsWithAmbiguity()
	{
		Test3 test;

		test = on(Test3.class).create().call("method").get();
		assertEquals(null, test.n);
		assertEquals(MethodType.NO_ARGS, test.methodType);

		test = on(Test3.class).create().call("method", "abc").get();
		assertEquals("abc", test.n);
		assertEquals(MethodType.OBJECT, test.methodType);

		test = on(Test3.class).create().call("method", new Long("1")).get();
		assertEquals(1L, test.n);
		assertEquals(MethodType.NUMBER, test.methodType);

		test = on(Test3.class).create().call("method", 1).get();
		assertEquals(1, test.n);
		assertEquals(MethodType.INTEGER, test.methodType);

		test = on(Test3.class).create().call("method", 'a').get();
		assertEquals('a', test.n);
		assertEquals(MethodType.OBJECT, test.methodType);
	}

	@Test
	public void testFields()
	{
		// Instance methods
		// ----------------
		Test1 test1 = new Test1();
		assertEquals(1, on(test1).set("I_INT1", 1).get("I_INT1"));
		assertEquals(1, on(test1).field("I_INT1").get());
		assertEquals(1, on(test1).set("I_INT2", 1).get("I_INT2"));
		assertEquals(1, on(test1).field("I_INT2").get());
		assertNull(on(test1).set("I_INT2", null).get("I_INT2"));
		assertNull(on(test1).field("I_INT2").get());

		// Static methods
		// --------------
		assertEquals(1, on(Test1.class).set("S_INT1", 1).get("S_INT1"));
		assertEquals(1, on(Test1.class).field("S_INT1").get());
		assertEquals(1, on(Test1.class).set("S_INT2", 1).get("S_INT2"));
		assertEquals(1, on(Test1.class).field("S_INT2").get());
		assertNull(on(Test1.class).set("S_INT2", null).get("S_INT2"));
		assertNull(on(Test1.class).field("S_INT2").get());
	}

	@Test
	public void testFieldMap()
	{
		// Instance methods
		// ----------------
		Test1 test1 = new Test1();
		assertEquals(3, on(test1).fields().size());
		assertTrue(on(test1).fields().containsKey("I_INT1"));
		assertTrue(on(test1).fields().containsKey("I_INT2"));
		assertTrue(on(test1).fields().containsKey("I_DATA"));

		assertEquals(1, on(test1).set("I_INT1", 1).fields().get("I_INT1").get());
		assertEquals(1, on(test1).fields().get("I_INT1").get());
		assertEquals(1, on(test1).set("I_INT2", 1).fields().get("I_INT2").get());
		assertEquals(1, on(test1).fields().get("I_INT2").get());
		assertNull(on(test1).set("I_INT2", null).fields().get("I_INT2").get());
		assertNull(on(test1).fields().get("I_INT2").get());

		// Static methods
		// --------------
		assertEquals(3, on(Test1.class).fields().size());
		assertTrue(on(Test1.class).fields().containsKey("S_INT1"));
		assertTrue(on(Test1.class).fields().containsKey("S_INT2"));
		assertTrue(on(Test1.class).fields().containsKey("S_DATA"));

		assertEquals(1, on(Test1.class).set("S_INT1", 1).fields().get("S_INT1").get());
		assertEquals(1, on(Test1.class).fields().get("S_INT1").get());
		assertEquals(1, on(Test1.class).set("S_INT2", 1).fields().get("S_INT2").get());
		assertEquals(1, on(Test1.class).fields().get("S_INT2").get());
		assertNull(on(Test1.class).set("S_INT2", null).fields().get("S_INT2").get());
		assertNull(on(Test1.class).fields().get("S_INT2").get());
	}

	@Test
	public void testFieldAdvanced()
	{
		on(Test1.class).set("S_DATA", on(Test1.class).create()).field("S_DATA").set("I_DATA", on(Test1.class).create())
				.field("I_DATA").set("I_INT1", 1).set("S_INT1", 2);
		assertEquals(2, Test1.S_INT1);
		assertEquals(null, Test1.S_INT2);
		assertEquals(0, Test1.S_DATA.I_INT1);
		assertEquals(null, Test1.S_DATA.I_INT2);
		assertEquals(1, Test1.S_DATA.I_DATA.I_INT1);
		assertEquals(null, Test1.S_DATA.I_DATA.I_INT2);
	}

	@Test
	public void testProxy()
	{
		assertEquals("abc", on((Object) "abc").as(Test5.class).substring(0));
		assertEquals("bc", on((Object) "abc").as(Test5.class).substring(1));
		assertEquals("c", on((Object) "abc").as(Test5.class).substring(2));

		assertEquals("a", on((Object) "abc").as(Test5.class).substring(0, 1));
		assertEquals("b", on((Object) "abc").as(Test5.class).substring(1, 2));
		assertEquals("c", on((Object) "abc").as(Test5.class).substring(2, 3));

		assertEquals("abc", on((Object) "abc").as(Test5.class).substring(new Integer(0)));
		assertEquals("bc", on((Object) "abc").as(Test5.class).substring(new Integer(1)));
		assertEquals("c", on((Object) "abc").as(Test5.class).substring(new Integer(2)));

		assertEquals("a", on((Object) "abc").as(Test5.class).substring(new Integer(0), new Integer(1)));
		assertEquals("b", on((Object) "abc").as(Test5.class).substring(new Integer(1), new Integer(2)));
		assertEquals("c", on((Object) "abc").as(Test5.class).substring(new Integer(2), new Integer(3)));
	}

	@Test
	public void testPrivateField() throws Exception
	{
		class Foo
		{
			String bar;
		}

		Foo foo = new Foo();
		on(foo).set("bar", "FooBar");
		assertThat(foo.bar, is("FooBar"));
		assertEquals("FooBar", on(foo).get("bar"));

		on(foo).set("bar", null);
		assertNull(foo.bar);
		assertNull(on(foo).get("bar"));
	}

	@Test
	public void testType() throws Exception
	{
		assertEquals(Object.class, on(new Object()).type());
		assertEquals(Object.class, on(Object.class).type());
		assertEquals(Integer.class, on(1).type());
		assertEquals(Integer.class, on(Integer.class).type());
	}

	@Before
	public void setUp()
	{
		Test1.S_INT1 = 0;
		Test1.S_INT2 = null;
		Test1.S_DATA = null;
	}
}

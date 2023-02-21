package kr.co.dbvision.lib;

public class Debug {

	public Debug(Object args) {
		System.out.println(String.format("\n\n----->>>[%s]<<<-----\n\n", args));
	}

	public static void showMe(Object args) {
		new Debug(args);
	}
}

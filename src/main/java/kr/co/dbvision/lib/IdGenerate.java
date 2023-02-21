package kr.co.dbvision.lib;

import java.util.List;
import java.util.UUID;

public class IdGenerate {

	private IdGenerate() {
	} // singleton

	public static synchronized String next() {
		UUID u = UUID.randomUUID();
		return toIDString52(u.getMostSignificantBits()) + toIDString52(u.getLeastSignificantBits());
	}

	public static synchronized String next(int digit) {
		UUID u = UUID.randomUUID();
		return (toIDString52(u.getMostSignificantBits()) + toIDString52(u.getLeastSignificantBits())).substring(0, digit);
	}

	public static synchronized String next(List<String> list, int digit) {
		UUID u = UUID.randomUUID();
		String id = "";
		while (true) {

			id = (toIDString52(u.getMostSignificantBits()) + toIDString52(u.getLeastSignificantBits())).substring(0, digit);

			for (String key : list) {
				if (id.equals(key)) {
					continue;
				}
			}
			break;
		}
		return id;
	}

	private static String toIDString52(long i) {
		char[] buf = new char[32];
		int z = 62; // 1 << 6;
		int cp = 32;
		long b = z - 1;
		do {
			buf[--cp] = DIGITS62[(int) (i & b)];
			i >>>= 6;
		} while (i != 0);
		return new String(buf, cp, (32 - cp));
	}

	/*
	 * private static String toIDString52(long i) { char[] buf = new char[32];
	 * int z = 76; // 1 << 6; int cp = 32; long b = z - 1; do { buf[--cp] =
	 * DIGITS66[(int) (i & b)]; i >>>= 6; } while (i != 0); return new
	 * String(buf, cp, (32 - cp)); }
	 */

	// array de 64+2 digitos
	private final static char[] DIGITS62 = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
			'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
			'V', 'W', 'X', 'Y', 'Z' };

	/*
	 * // array de 64+2 digitos private final static char[] DIGITS66 = { '0',
	 * '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e',
	 * 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	 * 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
	 * 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
	 * 'V', 'W', 'X', 'Y', 'Z', '가', '나', '다', '라', '마', '바', '사', '아', '자','차',
	 * '카', '타', '파', '하'};
	 */

	public static void main(String args[]) {

		// System.out.println( next(20) );
		// System.out.println( next(2) );
		// System.out.println( next(Arrays.asList("aMj","bbb","ccc"), 3) );

		for (int i = 0; i < 100; i++) {
			System.out.println(String.format("%s", next(20)));
		}
	}
}

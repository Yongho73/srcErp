package kr.co.dbvision.lib;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

@Service("Logo")
public class Logo {

	public static final String ANSI_RESET = "\u001B[0m";
	public static final String ANSI_BLACK = "\u001B[30m";
	public static final String ANSI_RED = "\u001B[31m";
	public static final String ANSI_GREEN = "\u001B[32m";
	public static final String ANSI_YELLOW = "\u001B[33m";
	public static final String ANSI_BLUE = "\u001B[34m";
	public static final String ANSI_PURPLE = "\u001B[35m";
	public static final String ANSI_CYAN = "\u001B[36m";
	public static final String ANSI_WHITE = "\u001B[37m";
	public static final String ANSI_BLACK_BACKGROUND = "\u001B[40m";
	public static final String ANSI_RED_BACKGROUND = "\u001B[41m";
	public static final String ANSI_GREEN_BACKGROUND = "\u001B[42m";
	public static final String ANSI_YELLOW_BACKGROUND = "\u001B[43m";
	public static final String ANSI_BLUE_BACKGROUND = "\u001B[44m";
	public static final String ANSI_PURPLE_BACKGROUND = "\u001B[45m";
	public static final String ANSI_CYAN_BACKGROUND = "\u001B[46m";
	public static final String ANSI_WHITE_BACKGROUND = "\u001B[47m";

	@PostConstruct
	public void LogoMake() {

		//System.out.println( ANSI_RESET );
		//System.out.println( ANSI_BLUE ); 
		System.out.println("\n");		
		System.out.println("                    |-|                               ");
		System.out.println("                   | |                                ");
		System.out.println("|----  |----  |-| | | |-| |-----| |-| |-----| |--| |-|");
		System.out.println("|      |    ) | || |  | | | |---| | | | |-| | | | || |");
		System.out.println("|    ) |---   | | |   | | |---- | | | | | | | | || | |");
		System.out.println("|      |    ) |  |    | | |---| | | | | |-| | | | |  |");
		//System.out.println("|--  |--  |--     |_| |-----| |_| |-----| |-| |--|"+ ANSI_RESET + ANSI_CYAN + "  Digital Business Vision, Inc. X-ERP v2.0 <applied X-GEN v1.0>" + ANSI_RESET);
		System.out.println("|----  |----  |--     |_| |-----| |_| |-----| |-| |--|  Digital Business Vision, Inc. X-ERP v2.0 <applied X-GEN v1.0>");
		System.out.println("\n");
		
	}

	public static void main(String[] args) {
		Logo logo = new Logo();
		logo.LogoMake();
	}
}

module.exports = 

class MQL
{
	static FLAG( value )
	{
		switch( value )
		{
			case MQL.IGNORE: return "IGNORE";
			case MQL.GET: return "GET";
			case MQL.SET: return "SET";
			case MQL.SMART_SET: return "SMART_SET";
			case MQL.SET_RULE: return "SET_RULE";
			case MQL.WHERE_RULE: return "WHERE_RULE";
			case MQL.EQUAL_TO: return "EQUAL_TO";

			case MQL.LIKE: return "LIKE";
			case MQL.NOT_LIKE: return "NOT_LIKE";

			case MQL.LEFT_JOIN: return "LEFT_JOIN";
			case MQL.RIGHT_JOIN: return "RIGHT_JOIN";
			case MQL.INNER_JOIN: return "INNER_JOIN";
			case MQL.OUTER_JOIN: return "OUTER_JOIN";
			case MQL.JOIN: return "JOIN";
			
			default: return "GET";
		}
	}
	constructor()
	{
		MQL.IGNORE			= 0;
		MQL.GET				= 1;
		MQL.SET				= 2;
		MQL.SMART_SET		= 3;
		MQL.SET_RULE		= 4;
		MQL.WHERE_RULE		= 5;
		MQL.EQUAL_TO		= 6;
		
		MQL.LIKE			= 7;
		MQL.NOT_LIKE		= 8;
		
		MQL.LEFT_JOIN		= 9;
		MQL.RIGHT_JOIN		= 10;
		MQL.INNER_JOIN	 	= 11;
		MQL.OUTER_JOIN 		= 12;
		MQL.JOIN			= 13;
		
		this.data = {};
		this.tables = {},
		this.select = [];
		this.group = [];
		this.options = {};
	}

	setTarget( key )
	{
		this.target = key;
	}

	setTable( key, name = key, primary = 'id' )
	{
		this[key] =this.tables[key] = { 'table':name, 'id':primary };
		this.data[key] = {};

		var self = this;
		this[key].setColumn = function( ckey, name = null, value = null, flag = null )
		{
			self.setColumn( key, ckey, name, value, flag );
		}

		if( !this.target )
		{
			this.target = key;
		}
	}
	
	setColumn( table, key, name = null, value = null, flag = null )
	{
		var temp = {
			name:name,
			value:value,
			flag:flag ? flag : MQL.GET
		};

		this.data[table][key] = temp;
	}
	
	setCustomSelect( item )
	{
		this.select.push( item );
	}

	setSlice( offset, limit )
	{
		this.slice = { offset:offset, limit:limit };
	}
	
	addGroupBy( value )
	{
		this.group.push( value );
	}
	
	removeGroupBy( value )
	{
		var index = this.group.indexOf( value );
		
		if( index == -1 )
		{
			return false;
		}
		else
		{
			this.group.splice( index, 1 );
		}
	}
}
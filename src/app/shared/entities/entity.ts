export function purgeAttribute(ref,object:Record<string|number,any>,attr:String):any
{        
    if(object==null || object==undefined) return null;
    if(object.hasOwnProperty(attr.toString())) return object[attr.toString()]
    if(ref.hasOwnProperty(attr.toString()))  return Reflect.get(this,attr.toString());
    return null;
}

export class Entity
{
    hydrate(entity: Record<string | number,any>):void
    {
        for(const key in Reflect.ownKeys(this))
        {
            if(entity.hasOwnProperty(key)) Reflect.set(this,key,entity[key]);
        }
    }

    toString():Record<string | number,any>
    {
        let r={};
        for(const k in Reflect.ownKeys(this))
        {
            r[k]=Reflect.get(this,k);
        }
        return r;
    }
}
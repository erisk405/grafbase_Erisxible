"use client";
import { getProviders, signIn } from 'next-auth/react';
import { useState , useEffect} from 'react';

type provider = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string,
  signinUrlParams: Record<string,string> | null;
};

type Providers = Record<string, provider>;

const AuthProviders = () => {
  const [provider , setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      if (res) {
        setProviders(res as Record<string, provider>);
      }
    }
    fetchProviders()
  },[])

  if(provider){
    return(
      <div>
        {Object.values(provider).map((provider: provider,index) => (
          <button key={index} onClick={() => signIn(provider?.id)}>{provider.id}</button>
        ))}
      </div>
    )
  }
}

export default AuthProviders
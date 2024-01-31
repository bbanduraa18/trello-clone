'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useOrganizationList } from '@clerk/nextjs';

const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) {
      return;
    }

    setActive({
      organization: params.OrganizationIdPage as string,
    });
  }, [setActive, params.OrganizationIdPage]);

  return null;
};

export default OrgControl;

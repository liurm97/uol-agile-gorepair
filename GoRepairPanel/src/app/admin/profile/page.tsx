'use client';

// Chakra imports
import { Box, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';

// Custom components
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';

// Assets
import banner from 'img/auth/banner.png';
import avatar from 'img/avatars/avatar4.png';

export default function ProfileOverview() {
  return (
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name="Adela Parkson"
          job="Administrator"
          email="aparkson@gmail.com"
        />
  );
}
